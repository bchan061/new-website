ig.module(
	'game.entities.deathanim'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityDeathanim = ig.Entity.extend({
		size: {x: 16, y: 16},
		animSheet: new ig.AnimationSheet('media/deathanim.png', 16, 16),
		timer: null,
		callBack: null,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.timer = new ig.Timer();
			this.addAnim('idle', 0.3, [0, 1, 2]);
		},
		update: function() {
			this.currentAnim = this.anims.idle;
			this.currentAnim.update();
			if(this.timer.delta() >= 0.9) {
				this.kill();
				if(this.callBack) { this.callBack(); }
			}
		}
	});
});