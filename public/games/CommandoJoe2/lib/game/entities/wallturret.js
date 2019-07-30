ig.module(
	'game.entities.wallturret'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityWallturret = ig.Entity.extend({
		size: {x: 11, y: 16},
		offset: {x: 5, y: 0},
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.FIXED,
		animSheet: new ig.AnimationSheet('media/environment/wallturret.png', 16, 16),
		shootTimer: null,
		flip: false,
		gravityFactor: 0,
		ShootSound: new ig.Sound('media/sounds/eshoot.mp3'),
		delta: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('crawl', 0.2, [0]);
			this.addAnim('shoot', 0.1, [1, 2]);
			this.shootTimer = new ig.Timer(this.delta);
		},
		update: function() {
			this.parent();
			if(this.shootTimer.delta() >= 2.0) {
				this.currentAnim = this.anims.crawl;
				var dx = ig.game.getEntitiesByType(EntityPlayer)[0];
				if(dx) {
					var sx = this.distanceTo(dx);
					var a = (sx/150);
					if(a > 1) { a = 1; }
					this.ShootSound.volume = (1 - a);
					if(sx <= 150) { this.ShootSound.play(); }
				}
				ig.game.spawnEntity(EntityEnemybullet, this.pos.x, this.pos.y, {flip:!this.flip, damage:50});
				this.shootTimer.set(0);
			}
			if(this.shootTimer.delta() >= 1.9) {
				this.currentAnim = this.anims.shoot;
			}
			this.currentAnim.flip.x = this.flip;
		},
		check: function(other) {
			if(other instanceof EntityBullet ||
			   other instanceof EntityEnemybullet ||
			   other instanceof EntityFlame) {
				other.kill();
			}
			if (other instanceof EntityMissile) {
				other.kill();
				this.kill();
			}
		},
		kill: function() {
			for(var x = 0; x < Math.floor(Math.random()*6); x++) {
				ig.game.spawnEntity(EntityStoneParticle, this.pos.x, this.pos.y-4, {flip:this.flip});
			}
			this.parent();
		}
	});
});
