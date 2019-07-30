ig.module(
	'game.entities.boss01'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityBoss01 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/enemies/boss01.png', 24, 32),
		size: {x: 24, y: 32},
		offset: {x: 0, y: 0},
		maxVel: {x: 100, y: 100},
		flip: false,
		friction: {x: 150, y: 0},
		speed: 20,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 625,
		maxHealth: 625,
		ShootTimer: null,
		ShootSound: new ig.Sound('media/sounds/shoot-cop.mp3'),
		willShoot: false,
		shoot: 0,
		active: false,
		gravityFactor: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('walk', .3, [0, 1, 2]);
			this.ShootTimer = new ig.Timer();
			if (localStorage.getItem("cj2newgameplus") == "true") {
				this.health *= 1.25; this.maxHealth *= 1.25;
			}
		},
		update: function() {
			this.parent();
			if(this.active) {
				var x = ig.game.getEntitiesByType(EntityPlayer)[0];
				if(x) { x = x.pos.x; }
				else { x = 0; }
				if(this.pos.x > x + 1) { this.flip = true; }
				else if(this.pos.x < x - 1) { this.flip = false; }
				if(!ig.game.collisionMap.getTile(
						this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y+1
					)
				) { this.flip = !this.flip; }
				var xdir = this.flip ? -1 : 1;
				this.vel.x = this.speed * xdir;
				this.currentAnim.flip.x = this.flip;
				if(this.ShootTimer.delta() >= 2.00) {
					this.shoot++;
					var dx = ig.game.getEntitiesByType(EntityPlayer)[0];
					if(dx) {
						var sx = this.distanceTo(dx);
						var a = (sx/300);
						if(a > 1) { a = 1; }
						this.ShootSound.volume = (1 - a);
						if(sx <= 150) { this.ShootSound.play(); }
					}
					if(this.shoot % 3 == 0) { ig.game.spawnEntity(EntityEnemybullet, this.pos.x, this.pos.y + 10, {flip:this.flip, damage:34}); }
					if(this.shoot >= 15) { this.ShootTimer.reset(); this.willShoot = true; this.shoot = 0; }
				}
			}
		},
		check: function(other) {
			if(!(other instanceof EntityMud)) { other.receiveDamage(50, this); }
			if(other instanceof EntityBullet) { ig.game.spawnEntity(EntityDeathexplosionParticle, this.pos.x+12, this.pos.y+16); other.kill(); }
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x) { this.flip = !this.flip; }
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
});
