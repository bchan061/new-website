ig.module(
	'game.entities.grate'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityGrate = ig.Entity.extend({
		size: {x: 16, y: 16},
		offset: {x: 0, y: 0},
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		update: function() {},
		animSheet: new ig.AnimationSheet('media/environment/grate.png', 16, 16),
		gravityFactor: 0,
		active: false,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('inactive', 0.6, [0]);
			this.addAnim('active', 0.6, [1]);
		},
		update: function() {
			this.currentAnim = (this.active?this.anims.active:this.anims.inactive);
			this.parent();
		}
	});
});
