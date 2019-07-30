ig.module (
	'game.entities.flame'
)

.requires (
	'impact.entity'
)

.defines(function() {
	EntityFlame = ig.Entity.extend({
		size: {x: 12, y: 12},
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet('media/flame.png', 12, 12),
		gravityFactor: 0,
		frame: 0,
		flip: false,
		maxVel: {x: 125, y: 0},
		
		init: function(x, y, settings) {
			this.parent(x + (settings.flip ? -8 : 12), y, settings);
			this.addAnim('idle', .07, [0]);
			this.currentAnim = this.anims.idle;
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.flip = settings.flip;
		},
		
		update: function() {
			this.parent();
			this.frame++;
			if(this.frame >= 120) { this.kill(); }
			this.currentAnim.alpha = 1-(this.frame/120);
			this.currentAnim.angle = (this.frame*15).toRad();
		},
		
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x || res.collision.y) { this.kill(); }
		},
		
		check: function(other) {
			if(other instanceof EntityIce) { other.kill(); }
			else if (other instanceof EntityMissile) { other.receiveDamage(0.5, this); }
			else if(!(other instanceof EntityPlayer) && !(other instanceof EntityFlame)) { other.receiveDamage(125-(this.frame/2), other); }
			else if (other instanceof EntityFlame || other instanceof EntityPlayer) {}
			else {
				this.kill();
			}
		}
	});
});

