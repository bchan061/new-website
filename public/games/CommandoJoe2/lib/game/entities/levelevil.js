ig.module(
	'game.entities.levelevil'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityLevelevil = ig.Entity.extend({
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 125, 0, 0.9)',
		_wmScalable: true,
		size: {x: 16, y: 16},
		level: null,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.FIXED,
		gravityFactor: 0,
		damage: 25,
		check: function( other ) {
			if(other instanceof EntityPlayer || other instanceof EntityEvil01) {
				other.receiveDamage(this.damage, this);
			}
			if(other instanceof EntityBullet ||
			   other instanceof EntityEnemybullet ||
			   other instanceof EntityFlame) {
				other.kill();
			}
		}
	});
});
