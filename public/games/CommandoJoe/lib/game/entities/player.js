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
		JumpSound: new ig.Sound('media/sounds/jump.mp3'),
		
		animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),	
		
		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,
		accelGround: 400,
		accelAir: 200,
		jump: 200,
		health: 10,
		flip: false,
		
		init: function( x, y, settings ) {
			this.startPosition = {x:x, y:y};
			this.parent( x, y, settings );
			
			this.ShootSound.volume = 0.5;
			this.JumpSound.volume = 0.5;
			
			// Add the animations
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
			this.addAnim( 'jump', 1, [9] );
			this.addAnim( 'fall', 0.4, [6,7] );
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
			if( this.standing && ig.input.pressed('jump') ) {
				this.vel.y = -this.jump;
				this.JumpSound.play();
			}
			
			// set the current animation, based on the player's speed
			if( this.vel.y < 0 ) {
				this.currentAnim = this.anims.jump;
			}
			else if( this.vel.y > 0 ) {
				this.currentAnim = this.anims.fall;
			}
			else if( this.vel.x != 0 ) {
				this.currentAnim = this.anims.run;
			}
			else {
				this.currentAnim = this.anims.idle;
			}
			
			this.currentAnim.flip.x = this.flip;
			
			if(ig.input.pressed('shoot') && (!ig.game.isDoneWithLevel)) {
				ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip});
				this.ShootSound.play();
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
						ig.game.spawnEntity(EntityPlayer, x, y);
					}
				});
			}
			else { ig.system.setGame(GameOverScreen); }
		}
	});
	EntityBullet = ig.Entity.extend({
		size: {x: 5, y: 3},
		animSheet: new ig.AnimationSheet('media/bullet.png', 5, 3),
		maxVel: {x: 200, y: 0},
		hit: 0,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,
		init: function(x, y, settings) {
			this.parent(x + (settings.flip ? -4 : 8), y+8, settings);
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.addAnim('idle', 0.2, [0]);
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x || res.collision.y) { this.kill(); }
		},
		check: function(other) {
			if((!(other instanceof EntityMud)) && !(other instanceof EntityPlayer)) { other.receiveDamage(3, this); }
			if(other instanceof EntityEvil01 || other instanceof EntityEvil02) { this.kill(); }
		}
	});
});