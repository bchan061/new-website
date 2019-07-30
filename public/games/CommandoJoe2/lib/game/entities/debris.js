ig.module(
	'game.entities.debris'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityDebris = ig.Entity.extend({
		size: {x: 4, y: 4},
		maxVel: {x: 160, y: 200},
		lifetime: 2,
		fadetime: 1,
		bounciness: 0,
		vel: {x: 100, y: 0},
		friction: {x: 100, y: 0},
		collides: ig.Entity.COLLIDES.LITE,
		colorOffset: 0,
		totalColors: 8,
		animSheet: new ig.AnimationSheet('media/environment/stone-shards.png', 4, 4),
		idleTimer: null,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			var frameID = Math.round(Math.random() * this.totalColors) + (this.colorOffset);
			this.addAnim('idle', 0.2, [frameID])
			this.vel.x = Math.random() * this.vel.x;
			this.idleTimer = new ig.Timer();
		},
		update: function() {
			if(this.idleTimer.delta() > this.lifetime) {
				this.kill();
				return;
			}
			this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0); this.parent();
		}
	});
});
