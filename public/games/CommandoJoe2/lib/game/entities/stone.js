ig.module(
	'game.entities.stone'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityStone = ig.Entity.extend({
		size: {x: 16, y: 16},
		target: {},
		gravityFactor: 0,
		checkAgainst: ig.Entity.TYPE.BOTH,
		type: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.FIXED,
		animSheet: new ig.AnimationSheet('media/environment/cracked-stone.png', 16, 16),
		health: 125,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('crawl', 0.08, [0]);
		},
		
		kill: function() {
			for(var x = 0; x < Math.floor(Math.random()*6); x++) {
				ig.game.spawnEntity(EntityStoneParticle, this.pos.x, this.pos.y-8, {flip:this.flip});
			}
			this.parent();
		}
	});
	EntityStoneParticle = ig.Entity.extend({
		size: {x: 2, y: 2},
		maxVel: {x: 160, y: 200},
		lifetime: 2,
		fadetime: 1,
		bounciness: 0,
		vel: {x: 100, y: 60},
		friction: {x: 100, y: 0},
		collides: ig.Entity.COLLIDES.LITE,
		colorOffset: 0,
		totalColors: 2,
		animSheet: new ig.AnimationSheet('media/environment/stone-shards.png', 2, 2),
		idleTimer: null,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			var frameID = Math.round(Math.random() * this.totalColors) + (this.colorOffset);
			this.addAnim('idle', 0.2, [frameID]);
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
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
