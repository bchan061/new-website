ig.module(
	'game.entities.grapple'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityGrapple = ig.Entity.extend({
		size: {x: 4, y: 4},
		maxVel: {x: 400, y: 0},
		hit: 0,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,
		flip: false,
		stop: false,
		init: function(x, y, settings) {
			this.parent(x, y+8, settings);
			this.flip = settings.flip;
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x || res.collision.y) { this.stop = true; }
		},
		update: function() {
			this.parent();
		},
		draw: function() {
			ig.system.context.fillStyle = "rgb(196, 196, 196)";
			ig.system.context.beginPath();
			ig.system.context.rect(
				(this.pos.x - ig.game.screen.x) * ig.system.scale, 
				(this.pos.y - ig.game.screen.y) * ig.system.scale, 
				this.size.x * ig.system.scale, 
				4 * ig.system.scale
			);
			ig.system.context.closePath();
			ig.system.context.fill();
		},
		receiveDamage: function(damage, other) {}
	});
});