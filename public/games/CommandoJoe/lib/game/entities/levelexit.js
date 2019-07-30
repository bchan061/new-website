 ig.module(
	'game.entities.levelexit'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityLevelexit = ig.Entity.extend({
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 0, 255, 0.7)',
		size: {x: 16, y: 16},
		offset: {x: 0, y: 0},
		level: null,
		checkAgainst: ig.Entity.TYPE.A,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
		},
		update: function() { },
		check: function( other ) {
			if(other instanceof EntityPlayer) {
				ig.game.isDoneWithLevel = true;
				ig.game.levelExit = this;
			}
		},
		nextLevel: function() {
			if(this.level) {
				var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function(m, l, a, b) {
					return a.toUpperCase() + b;
				});
				ig.game.loadLevelDeferred(ig.global['Level'+levelName]);
			}
		}
	});
});
