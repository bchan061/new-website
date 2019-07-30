ig.module(
	'game.entities.computer'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityComputer = ig.Entity.extend({
		size: {x: 10, y: 16},
		offset: {x: 0, y: 0},
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.FIXED,
		animSheet: new ig.AnimationSheet('media/environment/computer.png', 10, 16),
		gravityFactor: 0,
		active: true,
		blinkTimer: null,
		rumbleTimer: null,
		timeToRefresh: 0,
		enabledTargets: false,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('inactive', 0.6, [0]);
			this.addAnim('blink', 0.02, [1]);
			this.addAnim('active', 0.6, [2]);
			this.blinkTimer = new ig.Timer();
			this.rumbleTimer = new ig.Timer();
			this.blinkTimer.set(Math.random() * 2);
			this.timeToRefresh = Math.random() * 2;
		},
		update: function() {
			this.parent();
			if (this.active) {
				if (this.blinkTimer.delta() < 0) {
					this.currentAnim = this.anims.blink;
				}
				else {
					this.currentAnim = this.anims.inactive;
					if (this.blinkTimer.delta() >= this.timeToRefresh) {			
						this.blinkTimer.set(Math.random() * 2);
						this.timeToRefresh = Math.random() * 2;
					}
				}
			}
			else {
				this.currentAnim = this.anims.active;
			}
			if (!this.active && this.rumbleTimer.delta() <= 0) {
				ig.game.screen.x += (((Math.random()*25)-12.5)*Math.sin(this.rumbleTimer.delta()));
				ig.game.screen.y += (((Math.random()*25)-12.5)*Math.sin(this.rumbleTimer.delta()));
			}
			if (this.rumbleTimer.delta() > 0 && !this.enabledTargets && !this.active) {
				this.enabledTargets = true;
				for(var t in this.target) {
					var ent = ig.game.getEntityByName(this.target[t]);
					if (ent && ent instanceof EntityStone) {
						ent.kill();
					}
				}
				ig.music.play('c');
			}
		},
		draw: function() {
			this.parent();
		},
		check: function(other) {
			if (!(other instanceof EntityEnemymissile)) {
				other.kill();
				if (this.active) {
					this.active = false;
					this.rumbleTimer.set(2);
					ig.music.fadeOut(2);
					for(var x = 0; x < (Math.floor(Math.random()*6)+3); x++) {
						ig.game.spawnEntity(EntityStoneParticle, this.pos.x, this.pos.y-8, {flip:this.flip});
					}
				}
			}
			if (other instanceof EntityEnemymissile) {
				other.kill();
			}
		}
	});
});
