ig.module(
	'game.entities.text'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityText = ig.Entity.extend({
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,
		mainText: new ig.Font('media/white.png'),
		gravityFactor: 0,
		theText: "",
		frame: 0,
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.mainText.letterSpacing = 0;
			this.mainText.alpha = 0;
		},
		
		draw: function() {
			if(this.frame < 64) {
				this.mainText.alpha = (this.frame)/64;
			}
			if(this.frame >= 64) {
				this.mainText.alpha = (96 - (this.frame-64))/96;
			}
			this.mainText.draw(this.theText, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, ig.Font.ALIGN.CENTER);
			this.mainText.alpha = 1.0;
		},
		
		update: function() {
			this.parent();
			this.frame++;
			if(this.frame >= 160) {
				this.kill();
			}
		}
	});
});
