ig.module(
	'game.entities.boss03'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityBoss03 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/enemies/boss03.png', 32, 32),
		size: {x: 19, y: 31},
		offset: {x: 7, y: 1},
		maxVel: {x: 100, y: 100},
		flip: false,
		friction: {x: 150, y: 0},
		speed: 50,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 1200,
		maxHealth: 1200,
		ShootTimer: null,
		shoot: 0,
		active: false,
		gravityFactor: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', .3, [0]);
			this.addAnim('walk', .12, [1, 2]);
			this.addAnim('punch', .08, [3]);
			this.ShootTimer = new ig.Timer();
		},
		update: function() {
			this.parent();
			if(this.active) {
				var x = ig.game.getEntitiesByType(EntityPlayer)[0];
				if(x) { x = x.pos.x; }
				else { x = 0; }
				if(this.pos.x > x + 3) { this.flip = true; }
				else if(this.pos.x < x - 3) { this.flip = false; }
				if(ig.game.collisionMap.getTile(
						this.pos.x + (this.flip ? +4 : this.size.x-4), this.pos.y
					)
				) { this.flip = !this.flip; }
				var xdir = this.flip ? -1 : 1;
				this.vel.x = this.speed * xdir;
				this.currentAnim.flip.x = this.flip;
				if(this.ShootTimer.delta() >= 1.5) {
					this.currentAnim = this.anims.punch;
				}
				else if(this.vel.x > 0 || this.vel.x < 0) {
					this.currentAnim = this.anims.walk;
				}
				else if(this.vel.x == 0) {
					this.currentAnim = this.anims.idle;
				}
				if(this.ShootTimer.delta() >= 1.75) {
					this.currentAnim = this.anims.idle;
					this.ShootTimer.reset();
				}
			}
		},
		check: function(other) {
			if(!(other instanceof EntityMud)) { other.receiveDamage(50, this); }
			if(other instanceof EntityPlayer) {
				if(!(this.ShootTimer.delta() >= 1.5 && this.ShootTimer.delta() <= 1.75)) { other.receiveDamage(25, this); }
				else { other.receiveDamage(100, this); }
			}
			if(other instanceof EntityBullet) { other.kill(); }
		},
		kill: function() {
			ig.system.score += 9000;
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
