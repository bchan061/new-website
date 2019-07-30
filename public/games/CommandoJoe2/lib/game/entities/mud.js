ig.module(
	'game.entities.mud'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityMud = ig.Entity.extend({
		size: {x: 16, y: 16},
		target: {},
		gravity: 300,
		checkAgainst: ig.Entity.TYPE.BOTH,
		type: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.ACTIVE,
		animSheet: new ig.AnimationSheet('media/mud.png', 16, 16),
		bullet: null,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('crawl', 0.08, [0]);
		},
		
		check: function(other) {
			if(other instanceof EntityBullet) {
				this.bullet = other;
			}
			if(other instanceof EntityEnemybullet) {
				other.kill();
			}
			if(other instanceof EntityEvil01) { 
				other.receiveDamage(3, this);
			}
			if(other instanceof EntityIce) {
				other.kill();
			}
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(this.bullet instanceof EntityBullet) { this.bullet.kill(); this.bullet = null; }
		}
	});
});
