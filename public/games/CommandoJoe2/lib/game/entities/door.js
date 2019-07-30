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
		
		reverse: false,
		opened: false,
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('crawl', 0.08, [0]);
			if (this.reverse) {
				this.currentAnim.alpha = 0;
				this.collides = ig.Entity.COLLIDES.NONE;
			}
		},
		
		open: function() {
			if(!this.reverse) { this.kill(); }
			else {
				this.currentAnim.alpha = 1;
				this.collides = ig.Entity.COLLIDES.FIXED;
				this.opened = true;
			}
		},
		
		check: function(other) {
			if(other instanceof EntityBullet ||
			   other instanceof EntityEnemybullet ||
			   other instanceof EntityMissile ||
			   other instanceof EntityEnemymissile ||
			   other instanceof EntityFlame) {
				other.kill();
			}
		}
		
	});
});
