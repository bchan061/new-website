ig.module(
	'game.entities.boss05'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityBoss05 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/enemies/boss05.png', 16, 16),
		size: {x: 9, y: 14},
		offset: {x: 5, y: 2},
		maxVel: {x: 100, y: 200},
		flip: false,
		friction: {x: 600, y: 0},
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 10000,
		maxHealth: 10000,
		ShootTimer: null,
		ShootSound: new ig.Sound('media/sounds/eshoot.mp3'),
		JumpSound: new ig.Sound('media/sounds/jump.mp3'),
		active: false,
		shotsFired: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
			this.addAnim( 'jump', 1, [9] );
			this.addAnim( 'fall', 0.4, [6,7] );
			this.addAnim( 'jet', 0.33, [10, 11]);
			this.ShootTimer = new ig.Timer();
			if (localStorage.getItem("cj2newgameplus") == "true") {
				this.health *= 1.25; this.maxHealth *= 1.25;
			}
		},
		update: function() {
			this.parent();
			if (this.active) {
				if(!ig.game.collisionMap.getTile(
						this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y+1
					)
				) { this.flip = !this.flip; }
				var xdir = this.flip ? -1 : 1;
				this.vel.x = (this.standing?100 * xdir:0);
				this.currentAnim.flip.x = this.flip;
				var dx = ig.game.getEntitiesByType(EntityPlayer)[0];
				
				if(this.ShootTimer.delta() >= 1 && this.shotsFired % 22 != 0) {
					if(dx) {
						var sx = this.distanceTo(dx);
						var a = (sx/150);
						if(a > 1) { a = 1; }
						this.ShootSound.volume = (1 - a);
						if(sx <= 150) { this.ShootSound.play(); }
						ig.game.spawnEntity(EntityEnemymissile, this.pos.x + (this.flip?-4:8), this.pos.y+6, {flip:this.flip});
						this.shotsFired++;
						this.ShootTimer.reset();
					}
				}
				if (this.ShootTimer.delta() >= 3) {
					this.shotsFired++;
				}
				
				if (dx && !dx.standing && this.standing) {
					this.vel.y = -170;
					this.JumpSound.play();
				}
				
				if (!this.standing) {
					if (dx) {
						if(dx.pos.x <= this.pos.x) { this.flip = false; }
						else { this.flip = true; }
					}
				}
				else {
					if (dx) {
						if(dx.pos.x <= this.pos.x) { this.flip = true; }
						else { this.flip = false; }
					}
				}
			}
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
		},
		check: function(other) {
			if(!(other instanceof EntityMud)) { other.receiveDamage(50, this); }
		},
		kill: function() {
			ig.system.score += 100;
			this.parent();
			ig.game.spawnEntity(EntityDeathexplosion, this.pos.x, this.pos.y);
			ig.game.spawnEntity(EntityJetpack, this.pos.x, this.pos.y);
		},
		draw: function() {
			ig.system.context.fillStyle = "rgb(0, 255, 0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
				(this.pos.x - ig.game.screen.x) * ig.system.scale, 
				(this.pos.y - ig.game.screen.y - 8) * ig.system.scale, 
				this.size.x * ig.system.scale, 
				4 * ig.system.scale
			);
			ig.system.context.closePath();
			ig.system.context.fill();
			
			ig.system.context.fillStyle = "rgb(255, 0, 0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
				(this.pos.x - ig.game.screen.x + 1) * ig.system.scale, 
				(this.pos.y - ig.game.screen.y - 7) * ig.system.scale, 
				((this.size.x - 2) * (this.health / this.maxHealth)) * ig.system.scale, 
				2 * ig.system.scale
			);
			ig.system.context.closePath();
			ig.system.context.fill();
			this.parent();
		}
	});
});
