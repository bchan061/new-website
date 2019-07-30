ig.module(
	'game.entities.hook'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityHook = ig.Entity.extend({
		size: {x: 16, y: 15},
		target: {},
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/items/hook.png', 16, 15),
		zIndex: -1,
		gravityFactor: 0,
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', .07, [0]);
			this.currentAnim = this.anims.idle;
		},
		
		check: function(other) {
			if(other instanceof EntityPlayer) {
				if(!(other.aerialType == 2)) {
					other.aerialType = 2;
					ig.game.spawnEntity(EntityText, this.pos.x+6, this.pos.y-10, {theText: "GRAPPLING HOOK"});
				}
			}
		}
	});
});
