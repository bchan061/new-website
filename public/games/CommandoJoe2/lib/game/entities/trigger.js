ig.module(
	'game.entities.trigger'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityTrigger = ig.Entity.extend({
		size: {x: 16, y: 16},
		target: {},
		checkAgainst: ig.Entity.TYPE.BOTH,
		gravityFactor: 0,
		
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(196, 255, 0, 0.7)',
		
		check: function(other) {
			if(other instanceof EntityPlayer || other instanceof EntityMud) {
				for(var t in this.target) {
					var ent = ig.game.getEntityByName(this.target[t]);
					if(ent && ent instanceof EntityDoor) {
						ent.open();
					}
					if(ent &&
					   (ent instanceof EntityIce ||
					    ent instanceof EntityStone)) {
						ent.kill();
					}
					if(ent &&
					   (ent instanceof EntityBoss01 ||
					    ent instanceof EntityBoss02 ||
					    ent instanceof EntityBoss03 ||
					    ent instanceof EntityBoss04 ||
					    ent instanceof EntityBoss05 ||
					    ent instanceof EntityMovingplatform)) {
						ent.active = true;
					}
				}
			}
		}
	});
});
