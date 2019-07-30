ig.module(
	'game.entities.bullet'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityBullet = ig.Entity.extend({
		size: {x: 5, y: 3},
		animSheet: new ig.AnimationSheet('media/bullet.png', 5, 3),
		maxVel: {x: 200, y: 0},
		hit: 0,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,
		flip: false,
		damage: 25,
		init: function(x, y, settings) {
			this.parent(x + (settings.flip ? -4 : 8), y+8, settings);
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.flip = settings.flip;
			this.addAnim('idle', 0.2, [0]);
			this.anims.idle.flip.x = this.flip;
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x || res.collision.y) { this.kill(); }
		},
		check: function(other) {
			if((!(other instanceof EntityMud)) && !(other instanceof EntityPlayer) && !(other instanceof EntityBullet)) { other.receiveDamage(this.damage, this); this.kill(); }
			if(other instanceof EntityWater) { this.vel.x = (this.flip ? -50 : 50); }
		},
		update: function() {
			this.parent();
			this.currentAnim.flip.x = this.flip;
		}
	});
	EntityAngledbullet = EntityBullet.extend({
		angle: (0).toRad(),
		maxVel: {x: 200, y: 200},
		gravityFactor: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.vel.y = Math.tan(this.angle) * this.maxVel.x;
			this.vel.x = this.accel.x = (this.flip?-1:1)*(this.vel.y / Math.tan(this.angle));
			this.currentAnim.angle = Math.tan(this.angle);
		}
	})
});