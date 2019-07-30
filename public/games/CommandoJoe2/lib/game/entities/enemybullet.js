ig.module(
	'game.entities.enemybullet'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityEnemybullet = ig.Entity.extend({
		size: {x: 5, y: 3},
		animSheet: new ig.AnimationSheet('media/ebullet.png', 5, 3),
		maxVel: {x: 200, y: 0},
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		damage: 25,
		init: function(x, y, settings) {
			this.parent(x + (settings.flip ? -4 : 8), y+8, settings);
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.addAnim('idle', 0.2, [0]);
			this.anims.idle.flip.x = this.flip;
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x || res.collision.y) { this.kill(); }
		},
		check: function(other) {
			if(!(other instanceof EntityMud)) { other.receiveDamage(this.damage, this); }
			if(other instanceof EntityDoor) { this.kill(); }
			if(!(other instanceof EntityFlame)) { this.kill(); }
			if(other instanceof EntityWater) { this.vel.x = (this.flip ? -50 : 50); }
		}
	});
});