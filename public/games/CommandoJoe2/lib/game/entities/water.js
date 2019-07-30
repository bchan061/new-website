ig.module(
	'game.entities.water'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityWater = ig.Entity.extend({
		size: {x: 16, y: 16},
		target: {},
		checkAgainst: ig.Entity.TYPE.BOTH,
		gravityFactor: 0,
		
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 255, 0, 0.5)',
		
		check: function(other) {
			if(other instanceof EntityPlayer) {
				if(!ig.input.state('jump')) { other.vel.y /= 1.125; }
				if(ig.input.state('jump')) { other.vel.y = -50; }
				if(other.hasJetpack) {
					if(!ig.input.state('jump')) {
						other.vel.x /= 1.0675;
					}
				}
				else {
					other.vel.x /= 1.0675;
				}
				if(other.standing) {
					other.vel.x /= 1.5;
				}
				if (other.oxygen >= 1.5) {
					other.willLoseOxygen = true;
				}
			}
		}
	});
});
