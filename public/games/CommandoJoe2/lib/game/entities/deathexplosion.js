ig.module(
	'game.entities.deathexplosion'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityDeathexplosion = ig.Entity.extend({
		lifetime: 1,
		particles: 25,
		callBack: null,
		idleTimer: null,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			for(var i = 0; i < this.particles; i++) {
				ig.game.spawnEntity(EntityDeathexplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset: 0});
				this.idleTimer = new ig.Timer();
			}
		},
		update: function() {
			if(this.idleTimer.delta() > this.lifetime) {
				this.kill();
				if(this.callBack) { this.callBack(); }
			}
		}
	});
	EntityIceexplosion = ig.Entity.extend({
		lifetime: 1,
		particles: 10,
		callBack: null,
		idleTimer: null,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			for(var i = 0; i < this.particles; i++) {
				var a = ig.game.spawnEntity(EntityIceexplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset: 0});
				a.vel.x = (Math.random() * a.maxVel.x);
				a.vel.y = (Math.random() * a.maxVel.y);
				this.idleTimer = new ig.Timer();
			}
		},
		update: function() {
			if(this.idleTimer.delta() > this.lifetime) {
				this.kill();
				if(this.callBack) { this.callBack(); }
			}
		}
	});
	EntityDeathexplosionParticle = ig.Entity.extend({
		size: {x: 2, y: 2},
		maxVel: {x: 160, y: 200},
		lifetime: 2,
		fadetime: 1,
		bounciness: 0,
		vel: {x: 100, y: 30},
		friction: {x: 100, y: 0},
		collides: ig.Entity.COLLIDES.LITE,
		colorOffset: 0,
		totalColors: 7,
		animSheet: new ig.AnimationSheet('media/shards.png', 2, 2),
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
	EntityIceexplosionParticle = ig.Entity.extend({
		size: {x: 2, y: 2},
		maxVel: {x: 160, y: 200},
		lifetime: 2,
		fadetime: 1,
		bounciness: 0,
		vel: {x: 100, y: 30},
		friction: {x: 100, y: 0},
		collides: ig.Entity.COLLIDES.LITE,
		colorOffset: 0,
		totalColors: 2,
		animSheet: new ig.AnimationSheet('media/ishards.png', 2, 2),
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