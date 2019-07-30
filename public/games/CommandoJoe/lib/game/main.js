ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.system',
	'impact.input',
	'impact.font',
	'plugins.touch-button',
	'game.entities.levelexit',
	'game.entities.levelevil',
	'game.entities.evil01',
	'game.entities.evil02',
	'game.entities.boss01',
	'game.entities.trigger',
	'game.entities.end',
	'game.entities.door',
	'game.entities.deathanim',
	'game.entities.deathexplosion',
	'game.levels.intro',
	'game.levels.level01',
	'game.levels.level02',
	'game.levels.level03',
	'game.levels.level04',
	'game.levels.level05',
	'game.levels.level06',
	'game.levels.level07',
	'game.levels.level08',
	'game.levels.level09',
	'game.levels.level10',
	'game.levels.level11',
	'game.levels.level12',
	'game.levels.level13',
	'game.levels.level14',
	'game.levels.level15',
	'game.levels.level16',
	'game.levels.level17',
	'game.levels.level18',
	'game.levels.level19'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 300,
	alreadyPlayedShoot: false,
	alreadyPlayedShoot2: false,
	mainText: new ig.Font('media/white.png'),
	matte: new ig.Image('media/matte.png'),
	head: new ig.Image('media/head.png'),
	
	buttons: [],
	buttonImage: new ig.Image('media/buttons.png'),
	
	lives: 5,
	isDoneWithLevel: false,
	paused: false,
	levelExit: null,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.music.add('media/music/background.mp3');
		ig.music.loop = true;
		ig.music.play();
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.X, 'jump');
		ig.input.bind(ig.KEY.C, 'shoot');
		
			var ypos = ig.system.height - 60;
			this.buttons = [
				new ig.TouchButton('left', 0, ypos, 60, 60, this.buttonImage, 0),
				new ig.TouchButton('right', 75, ypos, 60, 60, this.buttonImage, 1),
				new ig.TouchButton('shoot', ig.system.width-135, ypos, 60, 60, this.buttonImage, 2),
				new ig.TouchButton('jump', ig.system.width-60, ypos, 60, 60, this.buttonImage, 3),
			];
		
		switch(ig.system.gameChoice) {
			case 0: this.lives = 8; break;
			case 1: this.lives = 6; break;
			case 2: this.lives = 5; break;
		}
		
		this.loadLevel(LevelIntro);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		if(!this.isDoneWithLevel) {
			this.alreadyPlayedShoot = false;
			this.alreadyPlayedShoot2 = false;
			var player = this.getEntitiesByType(EntityPlayer)[0];
			if(player)
			{
				this.screen.x = player.pos.x - ig.system.width / 2;
				this.screen.y = player.pos.y - ig.system.height / 2;
				if(this.screen.x < 0) { this.screen.x = 0; }
				if(this.screen.x > ig.system.width/2) { this.screen.x = ig.system.width/2; }
				if(this.screen.y < 0) { this.screen.y = 0; }
				if(this.screen.y > ig.system.height/2-39.5) { this.screen.y = ig.system.height/2-39.5; }
			}
			this.parent();
		}
		else {
			if(ig.input.pressed('shoot')) {
				if(this.isDoneWithLevel) {
					this.isDoneWithLevel = false;
					this.levelExit.nextLevel();
					this.levelExit = null;
					this.parent();
				}
			}
		}
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		if(!this.isDoneWithLevel) {
			this.mainText.draw('Lives:', 0, 0, ig.Font.ALIGN.LEFT);
			for(var x = 0; x < this.lives; x++) {
				this.head.draw((x * 24) + 48, 0);
			}
		}
		if(this.isDoneWithLevel) {
			this.matte.draw(0, 0);
			this.mainText.draw('Completed Level', ig.system.width/2, 10, ig.Font.ALIGN.CENTER);
			this.mainText.draw('Press "Shoot" to Continue', ig.system.width/2, 110, ig.Font.ALIGN.CENTER);
		}
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	}
});

IntroScreen = ig.Game.extend({
	mainText: new ig.Font('media/white.png'),
	logo: new ig.Image('media/logo.png'),
	buttons: [],
	buttonImage: new ig.Image('media/buttons.png'),
	choice: 0,
	init: function() {
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.C, 'shoot');
			var ypos = ig.system.height - 60;
			this.buttons = [
				new ig.TouchButton('left', 0, ypos, 60, 60, this.buttonImage, 0),
				new ig.TouchButton('right', 75, ypos, 60, 60, this.buttonImage, 1),
				new ig.TouchButton('shoot', ig.system.width-135, ypos, 60, 60, this.buttonImage, 2),
			];
	},
	update: function() {
		if(ig.input.pressed('shoot')) {
			ig.system.gameChoice = this.choice;
			ig.system.setGame(MyGame);
		}
		if(ig.input.pressed('left')) {
			if(this.choice > 0) { this.choice--; }
		}
		if(ig.input.pressed('right')) {
			if(this.choice < 2) { this.choice++; }
		}
		this.parent();
	},
	draw: function() {
		this.parent();
		
		var x = 0;
		switch(this.choice) {
			case 0: x = 12; break;
			case 1: x = 74; break;
			case 2: x = 131; break;
			default: x = 0; break;
		}
		
		this.logo.draw(0, 0);
		this.mainText.draw('Easy', 0, 95, ig.Font.ALIGN_LEFT);
		this.mainText.draw('Normal', 55, 95, ig.Font.ALIGN_LEFT);
		this.mainText.draw('Hard', 120, 95, ig.Font.ALIGN_LEFT);
		this.mainText.draw('^', x, 115, ig.Font.ALIGN_LEFT);
		this.mainText.draw('Use the Arrows to Select', 0, 135, ig.Font.ALIGN_LEFT);
		this.mainText.draw('Press "Shoot" to Start', 0, 155, ig.Font.ALIGN_LEFT);
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	}
});

GameOverScreen = ig.Game.extend({
	matte: new ig.Image('media/matte.png'),
	mainText: new ig.Font('media/white.png'),
	buttons: [],
	buttonImage: new ig.Image('media/buttons.png'),
	init: function() {
		ig.input.bind(ig.KEY.C, 'shoot');
			var ypos = ig.system.height - 60;
			this.buttons = [
				new ig.TouchButton('shoot', ig.system.width-135, ypos, 60, 60, this.buttonImage, 2),
			];
		ig.music.stop();
	},
	update: function() {
		if(ig.input.pressed('shoot')) {
			this.parent();
			ig.system.setGame(IntroScreen);
		}
	},
	draw: function() {
		this.matte.draw(0, 0);
		this.mainText.draw('Game Over', ig.system.width/2, 10, ig.Font.ALIGN.CENTER);
		this.mainText.draw('Press "Shoot" to Return to the Title Screen', ig.system.width/2, 50, ig.Font.ALIGN.CENTER);
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	}
});

EndScreen = ig.Game.extend({
	matte: new ig.Image('media/matte.png'),
	mainText: new ig.Font('media/white.png'),
	buttons: [],
	buttonImage: new ig.Image('media/buttons.png'),
	init: function() {
		ig.input.bind(ig.KEY.C, 'shoot');
			var ypos = ig.system.height - 60;
			this.buttons = [
				new ig.TouchButton('shoot', ig.system.width-135, ypos, 60, 60, this.buttonImage, 2),
			];
		ig.music.stop();
	},
	update: function() {
		if(ig.input.pressed('shoot')) {
			this.parent();
			ig.system.setGame(IntroScreen);
		}
	},
	draw: function() {
		this.matte.draw(0, 0);
		this.mainText.draw('Congratulations', ig.system.width/2, 10, ig.Font.ALIGN.CENTER);
		this.mainText.draw('You have beaten', ig.system.width/2, 50, ig.Font.ALIGN.CENTER);
		this.mainText.draw('Commando Joe', ig.system.width/2, 90, ig.Font.ALIGN.CENTER);
		this.mainText.draw('Press "Shoot" to Return to the Title Screen', ig.system.width/2, 140, ig.Font.ALIGN.CENTER);
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	}
});
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
if(ig.ua.mobile) { ig.Sound.enabled = false; }
ig.main( '#canvas', IntroScreen, 60, 320, 240, 2 );

});
