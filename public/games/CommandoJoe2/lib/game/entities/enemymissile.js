ig.module(
	'game.entities.enemymissile'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityEnemymissile = ig.Entity.extend({
		size: {x: 5, y: 3},
		animSheet: new ig.AnimationSheet('media/enemy-missile.png', 10, 6),
		maxVel: {x: 150, y: 0},
		hit: 0,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,
		explosionSound: new ig.Sound('media/sounds/explosion.mp3'),
		flip: false,
		zIndex: -1,
		init: function(x, y, settings) {
			this.parent(x + (settings.flip ? -4 : 4), y, settings);
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.flip = settings.flip;
			this.addAnim('idle', 0.2, [0]);
			this.anims.idle.flip.x = true;
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x || res.collision.y) { this.kill(); }
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
			if(other instanceof EntityPlayer) { other.receiveDamage(75, this); this.kill(); }
			if(other instanceof EntityWater) { this.vel.x = (this.flip ? -100 : 100); }
		}
	});
});