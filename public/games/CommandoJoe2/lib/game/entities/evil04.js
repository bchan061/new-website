ig.module(
	'game.entities.evil04'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityEvil04 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/enemies/enemy04.png', 16, 16),
		size: {x: 8, y: 14},
		offset: {x: 4, y: 2},
		maxVel: {x: 100, y: 100},
		flip: false,
		friction: {x: 150, y: 0},
		speed: 40,
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 375,
		maxHealth: 375,
		ShootTimer: null,
		ShootSound: new ig.Sound('media/sounds/eshoot.mp3'),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('jet', .25, [0, 1, 2]);
			this.ShootTimer = new ig.Timer();
			if (localStorage.getItem("cj2newgameplus") == "true") {
				this.health = 625; this.maxHealth = 625;
			}
		},
		update: function() {
			this.parent();
			this.currentAnim = this.anims.jet;
			this.currentAnim.flip.x = this.flip;
			if(ig.game.collisionMap.getTile(
					this.pos.x + (this.flip ? +4 : this.size.x-4), this.pos.y
				)
			) { this.flip = !this.flip; }
			this.vel.x = this.speed * (this.flip ? -1 : 1);
			if(	this.ShootTimer.delta() >= 0.5
				) {
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
			if(!(other instanceof EntityMud)) { other.receiveDamage(25, this); }
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x) { this.flip = !this.flip; }
		},
		kill: function() {
			ig.system.score += 20;
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
