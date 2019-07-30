ig.module(
	'game.entities.machinegun'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityMachinegun = ig.Entity.extend({
		size: {x: 16, y: 8},
		target: {},
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/items/machinegun.png', 16, 8),
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
				if(other.weapon != 2) {
					other.weapon = 2;
					ig.game.spawnEntity(EntityText, this.pos.x+6, this.pos.y-10, {theText: "MACHINE GUN"});
				}
			}
		}
	});
});
