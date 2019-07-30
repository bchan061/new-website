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
		_wmScalable: true,
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
				var x = ig.game.getEntitiesByType(EntityPlayer)[0];
				var y = 0;
				var z = (100 - ig.game.timer.delta());
				if (x) { y = x.health; } else { y = 1; }
				z = (z>0)?z:0;
				ig.system.score += Math.ceil(z + (y/10));
				ig.game.isDoneWithLevel = true;
				ig.game.levelExit = this;
			}
		},
		nextLevel: function() {
			if(this.level) {
				var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function(m, l, a, b) {
					return a.toUpperCase() + b;
				});
				localStorage.setItem("cj2level", 'Level'+levelName);
				localStorage.setItem('cj2score', ig.system.score+'');
				ig.system.level = 'Level'+levelName;
				var x = ('Level'+levelName).replace(/[A-z]/g, "");
				if (x >= 1 && x < 12) {
					if (ig.music.currentTrack != this.infiltration) {
						ig.music.play('a');
					}
				}
				else if (x >= 13 && x <= 23) {
					if (ig.music.currentTrack != this.infiltration2) {
						ig.music.play('c');
					}
				}
				else if ((x > 23 && x <= 33)) {
					if (ig.music.currentTrack != this.background) {
						ig.music.play('b');
					}
				}
				else {
					ig.music.stop();
				}
				ig.game.loadLevelDeferred(ig.global['Level'+levelName]);
			}
		}
	});
});
