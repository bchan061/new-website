ig.module(
	'game.entities.debriscontainer'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityDebriscontainer = ig.Entity.extend({
		size: {x: 16, y: 16},
		collides: ig.Entity.COLLIDES.NONE,
                gravityFactor: 0,
                delta: 0,
                rumbleTimer: null,
		_wmDrawBox: true,
		_wmScalable: true,
		_wmBoxColor: "rgba(150, 75, 0, 0.9)",
		minAmount: 3,
		randomAmount: 3,
		rumble: 1.33,
		rumbleDelta: 1,
		colorOffset: 0,
		init: function(x, y, settings) {
		    this.parent(x, y, settings);
		    this.rumbleTimer = new ig.Timer();
		},
		update: function() {
                    this.parent();
                    if (this.rumbleTimer.delta() < 0) {
                        /*
                        ig.game.screen.x += (((Math.random()*18)-9)*Math.sin(this.rumbleTimer.delta())) * this.rumbleDelta;
                        ig.game.screen.y += (((Math.random()*18)-9)*Math.sin(this.rumbleTimer.delta())) * this.rumbleDelta;
                        */
                        // From 2019: reduce shaking to avoid motion sickness
                        ig.game.screen.x += (((Math.random()*4)-2)*Math.sin(this.rumbleTimer.delta() / 4)) * this.rumbleDelta;
                        ig.game.screen.y += (((Math.random()*4)-2)*Math.sin(this.rumbleTimer.delta() / 4)) * this.rumbleDelta;
                    }
		},
                spawn: function() {
			for(var x = 0; x < Math.floor(Math.random()*this.randomAmount)+this.minAmount; x++) {
				ig.game.spawnEntity(EntityDebris, this.pos.x + (Math.random() * this.size.x), this.pos.y, {flip:this.flip, colorOffset: this.colorOffset});
			}
                        this.rumbleTimer.set(this.rumble);
                }
	});
});
