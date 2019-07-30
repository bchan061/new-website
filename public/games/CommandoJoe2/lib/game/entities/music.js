ig.module(
	'game.entities.music'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityMusic = ig.Entity.extend({
		size: {x: 16, y: 16},
		target: {},
		checkAgainst: ig.Entity.TYPE.BOTH,
		gravityFactor: 0,
		track: 0,
		
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(50, 255, 127, 0.7)',
		
		check: function(other) {
			if(other instanceof EntityPlayer) {
				switch (this.track) {
					case 1:
						ig.music.play('d');
					break;
				}
			}
		}
	});
});
