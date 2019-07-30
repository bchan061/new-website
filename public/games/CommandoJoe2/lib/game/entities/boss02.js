ig.module(
	'game.entities.boss02'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityBoss02 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/enemies/boss02.png', 24, 32),
		size: {x: 24, y: 32},
		offset: {x: 0, y: 0},
		maxVel: {x: 100, y: 100},
		flip: false,
		friction: {x: 150, y: 0},
		speed: 40,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 600,
		maxHealth: 600,
		ShootTimer: null,
		ShootSound: new ig.Sound('media/sounds/eshoot.mp3'),
		shoot: 0,
		active: true,
		gravityFactor: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('walk', .3, [0, 1, 2]);
			this.ShootTimer = new ig.Timer();
			this.active = false;
		},
		update: function() {
			this.parent();
			if(this.active) {
				var x = ig.game.getEntitiesByType(EntityPlayer)[0];
				var y = 0;
				if(x) { y = x.pos.y; x = x.pos.x; }
				else { x = 0; y = 0; }
				if(Math.abs(this.pos.x-x) > 6 && this.pos.x > x) { this.flip = true; }
				else { this.flip = false; }
				if(ig.game.collisionMap.getTile(
						this.pos.x + (this.flip ? +4 : this.size.x-4), this.pos.y
					)
				) { this.flip = !this.flip; }
				var xdir = this.flip ? -1 : 1;
				this.vel.x = this.speed * xdir;
				this.vel.y = (y > this.pos.y ? this.speed : -this.speed);
				this.currentAnim.flip.x = this.flip;
				if(this.ShootTimer.delta() >= 2.0) {
					var dx = ig.game.getEntitiesByType(EntityPlayer)[0];
					if(dx) {
						var sx = this.distanceTo(dx);
						var a = (sx/150);
						if(a > 1) { a = 1; }
						this.ShootSound.volume = (1 - a);
						if(sx <= 150) { this.ShootSound.play(); }
					}
					ig.game.spawnEntity(EntityEnemybullet, this.pos.x, this.pos.y + 10, {flip:this.flip});
				}
				if(this.ShootTimer.delta() >= 2.25) { this.ShootTimer.reset(); }
			}
		},
		check: function(other) {
			if(!(other instanceof EntityMud)) { other.receiveDamage(50, this); }
			if(other instanceof EntityPlayer) { other.receiveDamage(25, this); }
			if(other instanceof EntityBullet) {
				ig.game.spawnEntity(EntityDeathexplosionParticle, this.pos.x+12, this.pos.y+16);
				other.kill();
				this.active = true;
			}
		},
		handleMovementTrace: function(res) {
			this.parent(res);
		},
		kill: function() {
			ig.system.score += 20;
			for(var t in this.target) {
				var ent = ig.game.getEntityByName(this.target[t]);
				if(ent && ent instanceof EntityDoor) {
					ent.open();
				}
				if(ent && ent instanceof EntityIce) {
					ent.kill();
				}
			}
			this.parent();
			ig.game.spawnEntity(EntityDeathexplosion, this.pos.x, this.pos.y);
		},
		open: function() {
			this.active = true;
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
