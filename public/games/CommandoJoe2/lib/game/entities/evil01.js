ig.module(
	'game.entities.evil01'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityEvil01 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/enemies/enemy01.png', 16, 16),
		size: {x: 8, y: 14},
		offset: {x: 4, y: 2},
		maxVel: {x: 100, y: 100},
		flip: false,
		friction: {x: 150, y: 0},
		speed: 30,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 50,
		maxHealth: 50,
		ShootTimer: null,
		ShootSound: new ig.Sound('media/sounds/eshoot.mp3'),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.ShootSound.volume = 0.5;
			this.addAnim('walk', .07, [0, 1, 2, 3, 4, 5]);
			this.ShootTimer = new ig.Timer();
			if (localStorage.getItem("cj2newgameplus") == "true") {
				this.health = 250; this.maxHealth = 250;
			}
		},
		update: function() {
			this.parent();
			if(!ig.game.collisionMap.getTile(
					this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y+1
				)
			) { this.flip = !this.flip; }
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.speed * xdir;
			this.currentAnim.flip.x = this.flip;
			if(this.ShootTimer.delta() >= 1.5) {
				var dx = ig.game.getEntitiesByType(EntityPlayer)[0];
				if(dx) {
					var sx = this.distanceTo(dx);
					var a = (sx/150);
					if(a > 1) { a = 1; }
					this.ShootSound.volume = (1 - a);
					if(sx <= 150) { this.ShootSound.play(); }
				}
				ig.game.spawnEntity(EntityEnemybullet, this.pos.x, this.pos.y, {flip:this.flip});
				this.ShootTimer.reset();
			}
		},
		check: function(other) {
			if(!(other instanceof EntityMud)) { other.receiveDamage(20, this); }
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x) { this.flip = !this.flip; }
		},
		kill: function() {
			ig.system.score += 10;
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
