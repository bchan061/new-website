ig.module(
	'game.entities.lava'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityLava = ig.Entity.extend({
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 75, 0, 0.9)',
		_wmScalable: false,
		size: {x: 16, y: 12},
		offset: {x: 0, y : 4},
		level: null,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.FIXED,
		type: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/environment/lava.png', 16, 16),
		gravityFactor: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('walk', 0.6, [0, 1, 2, 1]);
		},
		update: function() {
			this.currentAnim = this.anims.walk;
			this.parent();
		},
		check: function( other ) {
			if(other instanceof EntityPlayer || other instanceof EntityEvil01) {
				other.receiveDamage(25, this);
			}
			if(other instanceof EntityBullet || other instanceof EntityEnemybullet) {
				other.kill();
			}
		},
		receiveDamage: function(damage, entity) {}
	});
});
