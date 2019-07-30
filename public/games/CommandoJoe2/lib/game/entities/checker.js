ig.module(
	'game.entities.checker'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityChecker = ig.Entity.extend({
		size: {x: 16, y: 16},
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.BOTH,
                gravityFactor: 0,
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(2, 128, 255, 0.7)',
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.Timer = new ig.Timer();
		},
		check: function(other) {
			if (other) {
				if (other instanceof EntityMovingplatform) {
					other.stop = true;
				}
			}
		}
	});
});
