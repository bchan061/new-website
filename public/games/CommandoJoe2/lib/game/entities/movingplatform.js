ig.module(
	'game.entities.movingplatform'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityMovingplatform = ig.Entity.extend({
		size: {x: 24, y: 8},
		max: 0, max2: 0,
		target: {},
		gravityFactor: 0,
		checkAgainst: ig.Entity.TYPE.BOTH,
		type: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.FIXED,
		animSheet: new ig.AnimationSheet('media/environment/movingplatform.png', 24, 8),
		flip: false,
		speed: 25,
		vertical: false,
		active: true,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('crawl', 0.08, [0]);
		},
		update: function() {
			this.parent();
			if (!this.vertical && this.active) {
				this.vel.x = (this.flip?-this.speed:this.speed);
				if (this.pos.x >= this.max2) { this.flip = true; }
				else if (this.pos.x <= this.max) { this.flip = false; }
			}
			else if (this.vertical && this.active) {
				this.vel.y = (this.flip?-this.speed:this.speed);
				if (this.pos.y >= this.max2) { this.flip = true; }
				else if (this.pos.y <= this.max) { this.flip = false; }
				if (this.stop) {
					this.active = false;
					this.vel.y = 0;
				}
			}
		},
		check: function(other) {
			if (other instanceof EntityFlame) {
				other.kill();
			}
		},
		receiveDamage: function(damage, other) {},
		handleMovementTrace: function(res) {
			this.parent(res);
		}
	});
});
