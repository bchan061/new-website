ig.module(
	'game.entities.boss04'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityBoss04 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/enemies/boss04.png', 32, 32),
		size: {x: 32, y: 32},
		maxVel: {x: 150, y: 100},
		flip: false,
		friction: {x: 150, y: 0},
		speed: 60,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 6750,
		maxHealth: 6750,
		ShootTimer: null,
		ShootSound: new ig.Sound('media/sounds/emissile.mp3'),
		isFlippedShot: false,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('walk', .07, [0, 1, 2, 1]);
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
				this.vel.x = (this.standing?(this.speed * xdir):0);
				this.currentAnim.flip.x = this.flip;
				if(this.ShootTimer.delta() >= 1) {
					var dx = ig.game.getEntitiesByType(EntityPlayer)[0];
					if(dx) {
						var sx = this.distanceTo(dx);
						var a = (sx/300);
						if(a > 1) { a = 1; }
						this.ShootSound.volume = (1 - a);
						if(sx <= 150) { this.ShootSound.play(); }
					}
					ig.game.spawnEntity(EntityEnemymissile, this.pos.x + (this.flip?4:0), this.pos.y+16, {flip:(this.isFlippedShot)?this.flip:!this.flip});
					this.isFlippedShot = !this.isFlippedShot;
					this.ShootTimer.reset();
				}
			}
		},
		check: function(other) {
			if(!(other instanceof EntityMud || other instanceof EntityEnemymissile)) { other.receiveDamage(50, this); }
			
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x) { this.flip = !this.flip; }
		},
		kill: function() {
			ig.system.score += 50;
			for(var t in this.target) {
				var ent = ig.game.getEntityByName(this.target[t]);
				if (ent && ent instanceof EntityMovingplatform) {
					ent.active = true;
				}
				if (ent && ent instanceof EntityDoor) {
					ent.kill();
				}
			}
			ig.game.spawnEntity(EntityDeathexplosion, this.pos.x, this.pos.y);
			this.parent();
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
