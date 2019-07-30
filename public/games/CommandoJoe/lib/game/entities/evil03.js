ig.module(
	'game.entities.evil03'
)

.requires(
	'impact.entity'
)

.defines(function() {
	EntityEvil03 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/enemy03.png', 16, 16),
		size: {x: 12, y: 14},
		offset: {x: 2, y: 2},
		maxVel: {x: 100, y: 100},
		flip: false,
		friction: {x: 150, y: 0},
		speed: 30,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		health: 15,
		maxHealth: 15,
		ShootTimer: null,
		ShootSound: new ig.Sound('media/sounds/shoot-cop.mp3'),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.ShootSound.volume = 0.5;
			this.addAnim('walk', .07, [0, 1, 2, 3, 4, 5]);
			this.ShootTimer = new ig.Timer();
			if(ig.system.gameChoice == 2) { this.health = 24; this.maxHealth = 24; }
		},
		update: function() {
			this.parent();
			if(!ig.game.collisionMap.getTile(
					this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y
				)
			) { this.flip = !this.flip; }
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.speed * xdir;
			this.currentAnim.flip.x = this.flip;
			if(this.ShootTimer.delta() >= 0.25) {
				var dx = ig.game.getEntitiesByType(EntityPlayer)[0];
				var sx;
				if(dx) { sx = this.distanceTo(dx); }
				else { sx = 0; }
				ig.game.spawnEntity(EntityEnemyBullet, this.pos.x, this.pos.y, {flip:this.flip});
				if(sx <= 150) { this.ShootSound.play(); }
				ig.game.alreadyPlayedShoot = true;
				this.ShootTimer.reset();
			}
		},
		check: function(other) {
			if(!(other instanceof EntityMud)) { other.kill(); }
			if(other instanceof EntityBullet) { ig.game.spawnEntity(EntityDeathexplosion, this.pos.x, this.pos.y); other.kill(); }
		},
		handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x) { this.flip = !this.flip; }
		},
		kill: function() {
			this.parent();
		},
		draw: function() {
			ig.system.context.fillStyle = "rgb(0, 255, 0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
				(this.pos.x - ig.game.screen.x) * ig.system.scale, 
				(this.pos.y - ig.game.screen.y - 8) * ig.system.scale, 
				this.size.x * ig.system.scale, 
				4 * ig.system.scale
			);
			ig.system.context.closePath();
			ig.system.context.fill();
			
			ig.system.context.fillStyle = "rgb(255, 0, 0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
				(this.pos.x - ig.game.screen.x + 1) * ig.system.scale, 
				(this.pos.y - ig.game.screen.y - 7) * ig.system.scale, 
				((this.size.x - 2) * (this.health / this.maxHealth)) * ig.system.scale, 
				2 * ig.system.scale
			);
			ig.system.context.closePath();
			ig.system.context.fill();
			this.parent();
		}
	});
});
