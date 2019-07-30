ig.module(
	'game.entities.evil05'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityEvil05 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/enemies/enemy05.png', 32, 32),
		size: {x: 20, y: 28},
		offset: {x: 8, y: 4},
		maxVel: {x: 150, y: 150},
		flip: false,
		friction: {x: 100, y: 0},
		speed: 50,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 1000,
		maxHealth: 1000,
		ShootTimer: null,
		ShootSound: new ig.Sound('media/sounds/emissile.mp3'),
		bulletsFired: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('walk', .07, [0, 1, 2, 3, 4]);
			this.ShootTimer = new ig.Timer();
			if (localStorage.getItem("cj2newgameplus") == "true") {
				this.health *= 1.5; this.maxHealth *= 1.5;
			}
		},
		update: function() {
			this.parent();
			if(!ig.game.collisionMap.getTile(
					this.pos.x + (this.flip ? +6 : this.size.x -6), this.pos.y + this.size.y+1
				)
			) { this.flip = !this.flip; }
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.speed * xdir
			this.currentAnim.flip.x = this.flip;
			if(this.ShootTimer.delta() >= 1.0) {
				var dx = ig.game.getEntitiesByType(EntityPlayer)[0];
				if(dx) {
					var sx = this.distanceTo(dx);
					var a = (sx/150);
					if(a > 1) { a = 1; }
					this.ShootSound.volume = (1 - a);
					if(sx <= 150) { this.ShootSound.play(); }
				}
				ig.game.spawnEntity(EntityEnemymissile, this.pos.x + (this.flip?-4:16), this.pos.y+12, {flip:this.flip});
				this.bulletsFired++;
				this.ShootTimer.reset();
			}
		},
		check: function(other) {
			if(!(other instanceof EntityMud)) { other.receiveDamage(50, this); }
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x) { this.flip = !this.flip; }
		},
		kill: function() {
			ig.system.score += 30;
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
