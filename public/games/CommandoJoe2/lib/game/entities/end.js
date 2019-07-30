ig.module(
	'game.entities.end'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityEnd = ig.Entity.extend({
		size: {x: 16, y: 16},
		target: {},
		checkAgainst: ig.Entity.TYPE.BOTH,
		
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(196, 128, 0, 0.7)',
		
		check: function(other) {
			if(other instanceof EntityPlayer) {
				ig.system.setGame(EndScreen);
			}
		}
	});
});
