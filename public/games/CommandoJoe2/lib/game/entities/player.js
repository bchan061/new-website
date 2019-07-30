ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 9, y: 14},
		offset: {x: 5, y: 2},
		
		maxVel: {x: 100, y: 200},
		friction: {x: 600, y: 0},
		
		type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		startPosition: null,
		
		ShootSound: new ig.Sound('media/sounds/shoot.mp3'),
		ShotgunSound: new ig.Sound('media/sounds/shotgun.mp3'),
		JumpSound: new ig.Sound('media/sounds/jump.mp3'),
		MissileSound: new ig.Sound('media/sounds/missile.mp3'),
		FireSound: new ig.Sound('media/sounds/fire.mp3'),
		MagnumSound: new ig.Sound('media/sounds/magnum.mp3'),
		
		animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),	
		
		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,
		accelGround: 400,
		accelAir: 200,
		jump: 200,
		health: 100,
		maxHealth: 100,
		oxygen: 200,
		maxOxygen: 200,
		noDamage: false,
		aerialType: 0,
		weapon: 0,
		shoot: 0,
		isGrappled: false,
		grappleEntity: null,
		willGrapple: false,
		wasHitBefore: false,
		isDrowning: false,
		willLoseOxygen: false,
		canRegenerateHealth: true,
		
		hitTimer: null,
		shootTimer: null,
		
		init: function( x, y, settings ) {
			this.startPosition = {x:x, y:y};
			this.parent( x, y, settings );
			
			this.hitTimer = new ig.Timer();
			this.shootTimer = new ig.Timer();
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
			this.addAnim( 'jump', 1, [9] );
			this.addAnim( 'fall', 0.4, [6,7] );
			this.addAnim( 'jet', 0.33, [10, 11]);
			this.addAnim( 'hook', 0.33, [12]);
			
			if (ig.system.newGamePlus == 'true') {
				this.weapon = 3;
				this.canRegenerateHealth = false;
			}
			
			if (ig.system.dlcWeapon != '0') {
				this.weapon = parseInt(ig.system.dlcWeapon) || 0;
			}
			
		},
		
		update: function() {
			
			// move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if( ig.input.state('left') ) {
				this.accel.x = -accel;
				this.flip = true;
			}
			else if( ig.input.state('right') ) {
				this.accel.x = accel;
				this.flip = false;
			}
			else {
				this.accel.x = 0;
			}
			
			// jump
			if(ig.input.pressed('jump') && !(this.aerialType == 1)) {
				if (this.standing) {
					this.vel.y = -this.jump;
					this.JumpSound.play();
				}
				if (this.aerialType == 2) {
					if (!this.standing && this.willGrapple) {
						if(this.grappleEntity != null) { this.grappleEntity.kill(); }
						this.grappleEntity = ig.game.spawnEntity(EntityGrapple, this.pos.x, this.pos.y, {flip:this.flip});
						this.willGrapple = false;
					}
					else if(!this.willGrapple) {
						this.willGrapple = true;
					}
					if (this.grappleEntity != null) {
						if (this.grappleEntity.stop) {							
							this.vel.y = -this.jump;
							this.JumpSound.play();
							this.gravityFactor = 1;
							this.grappleEntity.kill();
						}
					}
				}
			}
			
			// set the current animation, based on the player's speed
			if( this.vel.y < 0 && !this.standing ) {
				this.currentAnim = this.anims.jump;
			}
			else if( this.vel.y > 0  && !this.standing ) {
				this.currentAnim = this.anims.fall;
			}
			else if( this.vel.x != 0 ) {
				this.currentAnim = this.anims.run;
			}
			else {
				this.currentAnim = this.anims.idle;
			}
			
			if (!this.standing && this.aerialType == 2) {
				this.currentAnim = this.anims.hook;
			}
			
			this.currentAnim.flip.x = this.flip;
			
			if(ig.input.pressed('shoot') && (!ig.game.isDoneWithLevel)) {
				switch(this.weapon) {
					case 0:
						ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip});
						this.ShootSound.play();
					break;
					case 1:
						if (this.isDrowning || this.willLoseOxygen) {	
							ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip});
							this.ShootSound.play();
						}
					break;
					case 3:
						ig.game.spawnEntity(EntityMissile, this.pos.x, this.pos.y, {flip:this.flip});
						this.MissileSound.play();
					break;
					case 4:
						if (this.shootTimer.delta() >= 0) {
							ig.game.spawnEntity(EntityAngledbullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 125, angle: (-7.5).toRad()});
							ig.game.spawnEntity(EntityAngledbullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 125, angle: (-3.75).toRad()});
							ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 150});
							ig.game.spawnEntity(EntityAngledbullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 125, angle: (3.75).toRad()});
							ig.game.spawnEntity(EntityAngledbullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 125, angle: (7.5).toRad()});
							this.ShotgunSound.play();
							this.shootTimer.set(0.8);
						}
					break;
					case 5:
						if (this.shootTimer.delta() >= 0) {
							ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 375, maxVel: {x: 300, y: 0}});
							this.MagnumSound.play();
							this.shootTimer.set(0.5);
						}
					break;
				}
			}
			
			if(ig.input.state('shoot')) {
				switch(this.weapon) {
					case 1:
						if(this.shootTimer.delta() >= 0 &&
						   !(this.isDrowning || this.willLoseOxygen)) {
							ig.game.spawnEntity(EntityFlame, this.pos.x-2, this.pos.y, {flip:this.flip});
							this.FireSound.play();
							this.shootTimer.set(0.2);
						}
					break;
					case 2:
						if(this.shootTimer.delta() >= 0) {
							ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 50});
							this.ShootSound.play();
							this.shootTimer.set(0.16);
						}
					break;
					case 6:
						if (this.shootTimer.delta() >= 0) {
							ig.game.spawnEntity(EntityAngledbullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 100, maxVel: { x: 300, y: 300}, angle: (-10).toRad()});
							ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 125, maxVel: { x: 300, y: 0}});
							ig.game.spawnEntity(EntityAngledbullet, this.pos.x, this.pos.y, {flip:this.flip, damage: 100, maxVel: { x: 300, y: 300}, angle: (10).toRad()});
							this.ShootSound.play();
							this.shootTimer.set(0.32);
						}
					break;
					
				}
			}
			
			if(this.hitTimer.delta() >= 3.0) {
				this.noDamage = false;
			}
			
			if (!this.noDamage) {
				if (this.hitTimer.delta() >= 4.5) {
					if (this.health < this.maxHealth && !this.isDrowning && this.canRegenerateHealth) {
						this.health += 0.25;
					}
					else if (this.health < this.maxHealth && !this.isDrowning && !this.canRegenerateHealth) {
						this.health += 0.09;
					}
				}
			}
			
			if(ig.input.state('jump')) {
				switch (this.aerialType) {
					case 1:
						this.vel.y = -this.jump/2;
						this.currentAnim = this.anims.jet;
						this.currentAnim.flip.x = this.flip;
					break;
				}
			}
			
			this.shoot++;
			
			if (this.grappleEntity != null) {
				//if (!this.grappleEntity.stop) {
					this.gravityFactor = 0;
					this.vel.x = 0; this.vel.y = 0;
					if (this.grappleEntity.flip) {
						this.vel.x = -100;
					}
					else {
						this.vel.x = 100;
					}
				//}
			}
			if (this.willLoseOxygen) {
				this.oxygen -= 1.5;
				this.willLoseOxygen = false;
			}
			if (this.oxygen < this.maxOxygen) {
				this.oxygen++;
			}
			if (this.oxygen <= 2.5) {
				this.isDrowning = true;
				this.health -= 0.25;
			}
			else {
				this.isDrowning = false;
			}
			// move!
			this.parent();
		},
		
		kill: function() {
			this.parent();
			ig.game.lives -= 1;
			var x = this.startPosition.x;
			var y = this.startPosition.y;
			if(ig.game.lives > 0) { 
				ig.game.spawnEntity(EntityDeathanim, this.pos.x, this.pos.y, {
					callBack: function() {
						var a = ig.game.spawnEntity(EntityPlayer, x, y);
					}
				});
			}
			else { ig.system.setGame(GameOverScreen); }
		},
		
		draw: function() {
			ig.system.context.fillStyle = "rgb(255, 0, 0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
				(ig.system.width - 55) * ig.system.scale, 
				(8) * ig.system.scale, 
				(50) * ig.system.scale, 
				6 * ig.system.scale
			);
			ig.system.context.closePath();
			ig.system.context.fill();
			ig.system.context.fillStyle = "rgb(0, 255, 0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
				(ig.system.width - 55) * ig.system.scale, 
				(8) * ig.system.scale, 
				((50) * (this.health / this.maxHealth)) * ig.system.scale, 
				6 * ig.system.scale
			);
			ig.system.context.closePath();
			ig.system.context.fill();
			ig.system.context.fillStyle = "rgb(255, 0, 0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
				(ig.system.width - 55) * ig.system.scale, 
				(25) * ig.system.scale, 
				(50) * ig.system.scale, 
				6 * ig.system.scale
			);
			ig.system.context.closePath();
			ig.system.context.fill();
			ig.system.context.fillStyle = "rgb(0, 198, 255)";
			ig.system.context.beginPath();
			ig.system.context.rect(
				(ig.system.width - 55) * ig.system.scale, 
				(25) * ig.system.scale, 
				((50) * (this.oxygen / this.maxOxygen)) * ig.system.scale, 
				6 * ig.system.scale
			);
			ig.system.context.closePath();
			ig.system.context.fill();
			if(!this.noDamage) { this.parent(); }
			else {
				if(	(this.hitTimer.delta() % 0.25 >= 0 && this.hitTimer.delta() % 0.25 <= 0.125)
					)
				{
					this.parent();
				}
			}
		},
		
		receiveDamage: function(damage, entity) {
			if(this.hitTimer.delta() >= 3.0 || !this.wasHitBefore) {
				this.parent(damage, entity);
				this.hitTimer.reset();
				this.noDamage = true;
				this.wasHitBefore = true;
			}
		}
	});
});