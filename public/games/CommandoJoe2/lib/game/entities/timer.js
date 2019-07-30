ig.module(
	'game.entities.timer'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityTimer = ig.Entity.extend({
		size: {x: 16, y: 16},
		collides: ig.Entity.COLLIDES.NONE,
                gravityFactor: 0,
                delta: 0,
		Timer: null,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.Timer = new ig.Timer();
                        this.Timer.set(this.delta);
		},
		update: function() {
			if(this.Timer.delta() >= 0) {
				for(var t in this.target) {
					var ent = ig.game.getEntityByName(this.target[t]);
					if (ent && ent instanceof EntityDebriscontainer) {
						ent.spawn();
					}
				}
                                this.Timer.set(this.delta);
			}
		}
	});
});
