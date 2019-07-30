ig.module(
	'game.entities.ice'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityIce = ig.Entity.extend({
		size: {x: 16, y: 16},
		target: {},
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.FIXED,
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('media/ice.png', 16, 16),
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('crawl', 0.08, [0]);
		},
		
		check: function(other) {
			if(other instanceof EntityBullet || other instanceof EntityMissile) {
				other.kill();
				this.kill();
			}
			if(other instanceof EntityEnemybullet) {
				other.kill();
			}
			if(other instanceof EntityMud || other instanceof EntityFlame) {
				this.kill();
			}
		},
		kill: function() {
			this.parent();
			ig.game.spawnEntity(EntityIceexplosion, this.pos.x+12, this.pos.y+16);
		}
	});
});
