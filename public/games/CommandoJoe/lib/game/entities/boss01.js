ig.module(
	'game.entities.boss01'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityBoss01 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/boss01.png', 24, 32),
		size: {x: 24, y: 32},
		offset: {x: 0, y: 0},
		maxVel: {x: 100, y: 100},
		flip: false,
		friction: {x: 150, y: 0},
		speed: 20,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 240,
		maxHealth: 240,
		ShootTimer: null,
		ShootSound: new ig.Sound('media/sounds/shoot-cop.mp3'),
		willShoot: false,
		shoot: 0,
		active: false,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('walk', .3, [0, 1, 2]);
			this.ShootTimer = new ig.Timer();
		},
		update: function() {
			this.parent();
			this.currentAnim.alpha = (this.health/240);
			if(this.active) {
				var x = ig.game.getEntitiesByType(EntityPlayer)[0];
				if(x) { x = x.pos.x; }
				else { x = 0; }
				if(this.pos.x > x) { this.flip = true; }
				else { this.flip = false; }
				if(!ig.game.collisionMap.getTile(
						this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y+1
					)
				) { this.flip = !this.flip; }
				var xdir = this.flip ? -1 : 1;
				this.vel.x = this.speed * xdir;
				this.currentAnim.flip.x = this.flip;
				if(this.ShootTimer.delta() >= (2.00 - (0.5-(this.health/960)))) {
					this.willShoot = true;
					this.shoot += 1;
					if(this.shoot % 3 == 0) { ig.game.spawnEntity(EntityBossBullet, this.pos.x, this.pos.y + 10, {flip:this.flip}); }
					if(!ig.game.alreadyPlayedShoot) { this.ShootSound.play(); }
					ig.game.alreadyPlayedShoot = true;
					if(this.shoot >= 15) { this.ShootTimer.reset(); this.willShoot = true; this.shoot = 0; }
				}
			}
		},
		check: function(other) {
			if(!(other instanceof EntityMud)) { other.kill(); }
			if(other instanceof EntityBullet) { ig.game.spawnEntity(EntityDeathexplosionParticle, this.pos.x+12, this.pos.y+16); other.kill(); }
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x) { this.flip = !this.flip; }
		},
		kill: function() {
			for(var t in this.target) {
				var ent = ig.game.getEntityByName(this.target[t]);
				if(ent && ent instanceof EntityDoor) {
					ent.open();
				}
				if(ent && ent instanceof EntityIce) {
					ent.kill();
				}
				if(ent && ent instanceof EntityBoss01) {
					ent.active = true;
				}
			}
			this.parent();
			ig.game.spawnEntity(EntityDeathexplosion, this.pos.x, this.pos.y);
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
	EntityBossBullet = ig.Entity.extend({
		size: {x: 5, y: 3},
		animSheet: new ig.AnimationSheet('media/ebullet.png', 5, 3),
		maxVel: {x: 200, y: 0},
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
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
			if(!(other instanceof EntityMud)) { other.kill(); }
			this.kill();
		}
	});
});
