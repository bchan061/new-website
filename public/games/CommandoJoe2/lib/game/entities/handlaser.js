ig.module(
	'game.entities.handlaser'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityHandlaser = ig.Entity.extend({
		size: {x: 6, y: 2},
		animSheet: new ig.AnimationSheet('media/other/hand-laser.png', 6, 2),
		maxVel: {x: 150, y: 0},
		hit: 0,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,
		flip: false,
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
		check: function(other) {
			if(other instanceof EntityWater) { this.vel.x = (this.flip ? -100 : 100); }
			if(other instanceof EntityPlayer) { other.receiveDamage(34, this); }
		}
	});
});