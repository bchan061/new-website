ig.module(
	'game.entities.door'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityDoor = ig.Entity.extend({
		size: {x: 16, y: 16},
		target: {},
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.FIXED,
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('media/door.png', 16, 16),
		
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(196, 255, 0, 0.7)',
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('crawl', 0.08, [0]);
		},
		
		open: function() {
			this.kill();
		},
		
		check: function(other) {
			if(other instanceof EntityBullet || other instanceof EntityEnemyBullet || other instanceof EntityBossBullet) {
				other.kill();
			}
		}
		
	});
});
