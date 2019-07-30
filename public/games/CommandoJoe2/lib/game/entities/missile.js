ig.module(
	'game.entities.missile'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityMissile = ig.Entity.extend({
		size: {x: 10, y: 6},
		animSheet: new ig.AnimationSheet('media/missile.png', 10, 6),
		maxVel: {x: 250, y: 0},
		hit: 0,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,
		explosionSound: new ig.Sound('media/sounds/explosion.mp3'),
		flip: false,
		health: 1,
		init: function(x, y, settings) {
			this.parent(x + (settings.flip ? -4 : 8), y+8, settings);
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.flip = settings.flip;
			this.addAnim('idle', 0.2, [0]);
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x || res.collision.y) { this.kill(); }
		},
		update: function() {
			this.parent();
			this.currentAnim.flip.x = this.flip;
		},
		kill: function() {
			this.spawnParticles();
			this.parent();
			var dx = ig.game.getEntitiesByType(EntityPlayer)[0];
			if(dx) {
				var sx = this.distanceTo(dx);
				var a = (sx/300);
				if(a > 1) { a = 1; }
				this.explosionSound.volume = (1 - a);
				if(sx <= 300) { this.explosionSound.play(); }
			}
		},
		spawnParticles: function() {
			ig.game.spawnEntity(EntityExplosionParticle, this.pos.x-(this.flip?5:0), this.pos.y-3, {flip:this.flip});
		},
		check: function(other) {
			if((!(other instanceof EntityMud)) && !(other instanceof EntityPlayer)) { other.receiveDamage(125, this); this.kill(); }
			if(other instanceof EntityWater) { this.vel.x = (this.flip ? -100 : 100); }
		}
	});
	EntityExplosionParticle = ig.Entity.extend({
		size: {x: 12, y: 12},
		target: {},
		checkAgainst: ig.Entity.TYPE.NONE,
		animSheet: new ig.AnimationSheet('media/environment/explosion-particle.png', 12, 12),
		gravityFactor: 0,
		particleTimer: null,
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', .25, [0])
			this.particleTimer = new ig.Timer();
		},
		
		update: function() {
			this.parent();
			this.currentAnim.alpha = 1-(this.particleTimer.delta()*4);
			if (this.particleTimer.delta() > .25) {
				this.kill();
			}
		}
		
	});
});