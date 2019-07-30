ig.module(
	'game.entities.launcher'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityLauncher = ig.Entity.extend({
		size: {x: 16, y: 9},
		target: {},
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/items/launcher.png', 16, 9),
		zIndex: -1,
		gravityFactor: 0,
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', .07, [0]);
			this.currentAnim = this.anims.idle;
			if (localStorage.getItem("cj2newgameplus") == "true" || localStorage.getItem("cj2dlcweapon") != '0') {
				this.kill();
			}
		},
		
		check: function(other) {
			if(other instanceof EntityPlayer) {
				if(other.weapon != 3) {
					other.weapon = 3;
					ig.game.spawnEntity(EntityText, this.pos.x+6, this.pos.y-10, {theText: "MISSILE LAUNCHER"});
				}
			}
		}
	});
});
