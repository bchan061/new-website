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
	'game.entities.evil03',
	'game.entities.evil04',
	'game.entities.evil05',
	'game.entities.boss01',
	'game.entities.boss02',
	'game.entities.boss03',
	'game.entities.boss04',
	'game.entities.boss05',
	'game.entities.trigger',
	'game.entities.end',
	'game.entities.door',
	'game.entities.deathanim',
	'game.entities.deathexplosion',
	'game.entities.water',
	'game.entities.mud',
	'game.entities.lava',
	'game.entities.bullet',
	'game.entities.enemybullet',
	'game.entities.jetpack',
	'game.entities.text',
	'game.entities.grate',
	'game.entities.flamethrower',
	'game.entities.machinegun',
	'game.entities.flame',
	'game.entities.handlaser',
	'game.entities.hook',
	'game.entities.grapple',
	'game.entities.movingplatform',
	'game.entities.missile',
	'game.entities.stone',
	'game.entities.enemymissile',
	'game.entities.computer',
	'game.entities.debris',
	'game.entities.debriscontainer',
	'game.entities.timer',
	'game.entities.checker',
	'game.entities.music',
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
	'game.levels.level19',
	'game.levels.level20',
	'game.levels.level21',
	'game.levels.level22',
	'game.levels.level23',
	'game.levels.level24',
	'game.levels.level25',
	'game.levels.level26',
	'game.levels.level27',
	'game.levels.level28',
	'game.levels.level29',
	'game.levels.level30',
	'game.levels.level31',
	'game.levels.level32',
	'game.levels.level33',
	'game.levels.level34'
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
	pauseImage: new ig.Image('media/pause.png'),
	isDoneWithLevel: false,
	paused: false,
	levelExit: null,
	
	infiltration: new ig.Sound('media/music/infiltration.mp3'),
	infiltration2: new ig.Sound('media/music/infiltration2.mp3'),
	background: new ig.Sound('media/music/background.mp3'),
	boss: new ig.Sound('media/music/boss.mp3'),
	
	maxX: 0,
	maxY: 0,
	
	timer: null,
	
	init: function() {
		this.timer = new ig.Timer();
		ig.music.add(this.infiltration, 'a');
		ig.music.add(this.background, 'b');
		ig.music.add(this.infiltration2, 'c');
		ig.music.add(this.boss, 'd');
		ig.music.loop = true;
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.X, 'jump');
		ig.input.bind(ig.KEY.C, 'shoot');
		ig.input.bind(ig.KEY.MOUSE1, 'click');
		
			var ypos = ig.system.height - 60;
			this.buttons = [
				new ig.TouchButton('left', 0, ypos, 60, 60, this.buttonImage, 0),
				new ig.TouchButton('right', 75, ypos, 60, 60, this.buttonImage, 1),
				new ig.TouchButton('shoot', ig.system.width-135, ypos, 60, 60, this.buttonImage, 2),
				new ig.TouchButton('jump', ig.system.width-60, ypos, 60, 60, this.buttonImage, 3),
			];
		if (!ig.system.isLoading) {
			this.loadLevel(LevelLevel01);
			ig.music.play('a');
		}
		else {
			if (localStorage.getItem("cj2level") != null) {
				this.loadLevel(ig.global[localStorage.getItem("cj2level")]);				
				var x = localStorage.getItem("cj2level").replace(/[A-z]/g, "");
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
			}
		}
		ig.system.isLoading = false;
	},
	
	loadLevel: function(level) {
		this.parent( level );
		this.maxX = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
		this.maxY = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
		for (var x = 0; x < this.backgroundMaps.length; x++) {
			this.backgroundMaps[x].preRender = true;
		}
		this.timer.set(0);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		if(!this.isDoneWithLevel) {
			var player = this.getEntitiesByType(EntityPlayer)[0];
			if (player) {
				this.screen.x = player.pos.x - ig.system.width / 2;
				this.screen.y = player.pos.y - ig.system.height / 2;
			}
			if(this.screen.x < 0) { this.screen.x = 0; }
			if(this.screen.x > this.maxX) { this.screen.x = this.maxX; }
			if(this.screen.y < 0) { this.screen.y = 0; }
			if(this.screen.y > this.maxY) { this.screen.y = this.maxY; }
			if (ig.input.pressed('click')) {
				if (ig.input.mouse.x >= ig.system.width-108 &&
				    ig.input.mouse.x <= ig.system.width-92 &&
				    ig.input.mouse.y >= 4 &&
				    ig.input.mouse.y <= 20) {
					this.paused = !this.paused;
					var x = ig.game.getEntitiesByType(EntityPlayer)[0];
					if(x) {
						(this.paused?x.hitTimer.pause():x.hitTimer.unpause());
						(this.paused?x.shootTimer.pause():x.shootTimer.unpause());
						(this.paused?this.timer.pause():this.timer.unpause());
					}
				}
			}
			if(!this.paused) { this.parent(); }
			else {
				if (ig.input.pressed('jump')) {
					ig.system.score = '0';
					ig.system.setGame(IntroScreen);
				}
			}
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
			this.head.draw(ig.system.width - 75, 0);
			this.mainText.draw('O2', (ig.system.width - 80), 18, ig.Font.ALIGN.LEFT)
			if (this.paused) {
				this.matte.draw(0, 0);
				this.mainText.draw('PAUSED', ig.system.width/2, ig.system.height/2-100, ig.Font.ALIGN.CENTER);
				this.mainText.draw('PRESS JUMP TO RETURN TO THE', ig.system.width/2, ig.system.height/2-50, ig.Font.ALIGN.CENTER);
				this.mainText.draw('TITLE SCREEN', ig.system.width/2, ig.system.height/2-25, ig.Font.ALIGN.CENTER);
			}
			this.pauseImage.draw(ig.system.width - 108, 4, (this.paused?16:0), 0, 16, 16);
		}
		if(this.isDoneWithLevel) {
			this.matte.draw(0, 0);
			this.mainText.draw('Completed Level', ig.system.width/2, 10, ig.Font.ALIGN.CENTER);
			this.mainText.draw('Press "Shoot" to Continue', ig.system.width/2, 110, ig.Font.ALIGN.CENTER);
            // Extra from 2019: show score
            this.mainText.draw("Score: " + ig.system.score, ig.system.width / 2, 210, ig.Font.ALIGN.CENTER);
		}
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
		//
	}
});

IntroScreen = ig.Game.extend({
	
	// TODO: Create choice menu when selecting "New Game" - ask whether New Game or New Game+
	// Add a third, very hard mode?
	
	mainText: new ig.Font('media/white.png'),
	logo: new ig.Image('media/logo.png'),
	background: new ig.Image('media/background.png'),
	buttons: [],
	buttonImage: new ig.Image('media/buttons.png'),
	choice: 0,
	frame: 0,
	state: 0,
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
		this.frame = ig.system.frame; if (this.frame == null) { this.frame = 0; }
		this.mainText.letterSpacing = 0;        
            
        // Extra from 2019: fix for modern browsers to prevent guns from killing themselves
        if (localStorage.getItem("cj2dlcweapon") == null) {
            localStorage.setItem("cj2dlcweapon", '0')
        }
        
        // Extra from 2019: enable dlc weapons
        if (localStorage.getItem("cj2dlcweapons") == null) {
            localStorage.setItem("cj2dlcweapons", "true")
        }
        
		ig.system.dlcWeapon = localStorage.getItem('cj2dlcweapon');
		ig.system.level = localStorage.getItem('cj2level');
		ig.system.newGamePlus = localStorage.getItem('cj2newgameplus');
		ig.system.score = '0';
	},
	update: function() {
		this.frame++;
		this.parent();
		if (ig.input.pressed('left') && this.choice > 0) { this.choice--; }
		if (ig.input.pressed('right') && this.choice < 4) { this.choice++; }
		if (ig.input.pressed('shoot')) {
			switch(this.choice) {
				case 0:
					ig.system.newGamePlus = false;
					ig.system.setGame(MyGame);
					ig.system.score = 0;
				break;
				case 1:
					if (localStorage.getItem("cj2level") != null) {
						if (localStorage.getItem("cj2level") != 'end') {
							ig.system.isLoading = true;
							ig.system.setGame(MyGame);
						}
						else {
							ig.system.frame = this.frame;
							ig.system.setGame(NewGamePlusScreen);
						}
						ig.system.score = parseInt(localStorage.getItem('cj2score')) || 0;
					}
				break;
				case 3:
					ig.system.frame = this.frame;
					ig.system.setGame(OptionsScreen);
				break;
				case 4:
					ig.system.frame = this.frame;
					ig.system.setGame(DLCScreen);
				break;
			}
		}
	},
	draw: function() {
		this.parent();
		this.background.draw((this.frame%64-64)/2, 0);
		this.logo.draw(0, 0);
		this.mainText.draw('START GAME', 24 * (ig.system.width/320), 30 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		if (ig.system.level == 'end' || ig.system.newGamePlus == 'true') {
			this.mainText.draw('LOAD GAME (NEW GAME PLUS)', 30 * (ig.system.width/320), 45 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		}
		else {
			this.mainText.draw('LOAD GAME', 30 * (ig.system.width/320), 45 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		}
		this.mainText.draw('LEADERBOARDS (GAME CENTER)', 36 * (ig.system.width/320), 60 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		this.mainText.draw('OPTIONS', 42 * (ig.system.width/320), 75 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		this.mainText.draw('DOWNLOADABLE EXTRAS', 48 * (ig.system.width/320), 90 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		
		this.mainText.draw('>', (16 + (6*this.choice)) * (ig.system.width/320), (30 + (15*this.choice)) * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	}
});

OptionsScreen = ig.Game.extend({
	mainText: new ig.Font('media/white.png'),
	logo: new ig.Image('media/logo.png'),
	background: new ig.Image('media/background.png'),
	buttons: [],
	buttonImage: new ig.Image('media/buttons.png'),
	choice: 0,
	frame: 0,
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
		this.frame = ig.system.frame;
		this.mainText.letterSpacing = 0;
	},
	update: function() {
		this.frame++;
		this.parent();
		if (ig.input.pressed('left') && this.choice > 0) { this.choice--; }
		if (ig.input.pressed('right') && this.choice < 3) { this.choice++; }
		if (ig.input.pressed('shoot')) {
			switch(this.choice) {
				case 0: ig.music.volume = (ig.music.volume==1.00?0:1); break;
				case 1: ig.Sound.enabled = !ig.Sound.enabled; break;
				case 2: break;
				case 3: ig.system.setGame(IntroScreen); ig.system.frame = this.frame; break;
			}
		}
	},
	draw: function() {
		this.parent();
		this.background.draw((this.frame%64-64)/2, 0);
		this.logo.draw(0, 0);
		this.mainText.draw('MUSIC: ' + (ig.music.volume==1.0?'ENABLED':'DISABLED'), 24 * (ig.system.width/320), 30 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		this.mainText.draw('SOUND: ' + (ig.Sound.enabled?'ENABLED':'DISABLED'), 30 * (ig.system.width/320), 45 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		this.mainText.draw('LOG INTO GAME CENTER', 36 * (ig.system.width/320), 60 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		this.mainText.draw('BACK', 42 * (ig.system.width/320), 75 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		
		this.mainText.draw('>', (16 + (6*this.choice)) * (ig.system.width/320), (30 + (15*this.choice)) * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	}
});

NewGamePlusScreen = ig.Game.extend({
	mainText: new ig.Font('media/white.png'),
	logo: new ig.Image('media/logo.png'),
	background: new ig.Image('media/background.png'),
	buttons: [],
	buttonImage: new ig.Image('media/buttons.png'),
	choice: 0,
	frame: 0,
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
		this.frame = ig.system.frame;
		this.mainText.letterSpacing = 0;
	},
	update: function() {
		this.frame++;
		this.parent();
		if (ig.input.pressed('left') && this.choice > 0) { this.choice--; }
		if (ig.input.pressed('right') && this.choice < 1) { this.choice++; }
		if (ig.input.pressed('shoot')) {
			switch(this.choice) {
				case 0:
					localStorage.setItem("cj2newgameplus", "true");
					ig.system.newGamePlus = 'true';
					ig.system.setGame(MyGame);
				break;
				case 1:
					ig.system.frame = this.frame;
					ig.system.setGame(IntroScreen);
				break;
			}
		}
	},
	draw: function() {
		this.parent();
		this.background.draw((this.frame%64-64)/2, 0);
		this.logo.draw(0, 0);
		this.mainText.draw('NEW GAME PLUS:', 15 * (ig.system.width/320), 15 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		this.mainText.draw('- SLOWER HEALTH REGENERATION', 15 * (ig.system.width/320), 30 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		if (ig.system.dlcWeapon != 0) {
			this.mainText.draw('- ENEMIES HAVE HIGHER HEALTH', 15 * (ig.system.width/320), 45  * (ig.system.height/240), ig.Font.ALIGN.LEFT);	
		}
		else {
			this.mainText.draw('- ONLY USE THE LAUNCHER', 15 * (ig.system.width/320), 45 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
			this.mainText.draw('- ENEMIES HAVE HIGHER HEALTH', 15 * (ig.system.width/320), 60 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		}
		this.mainText.draw('START', 24 * (ig.system.width/320), 90 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		this.mainText.draw('BACK', 30 * (ig.system.width/320), 105 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		
		this.mainText.draw('>', (16 + (6*this.choice)) * (ig.system.width/320), (90 + (15*this.choice)) * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	}
});

DLCScreen = ig.Game.extend({
	mainText: new ig.Font('media/white.png'),
	logo: new ig.Image('media/logo.png'),
	background: new ig.Image('media/background.png'),
	buttons: [],
	buttonImage: new ig.Image('media/buttons.png'),
	choice: 0,
	frame: 0,
	hasWeapons: false,
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
		this.frame = ig.system.frame;
		this.mainText.letterSpacing = 0;
		
		if (localStorage.getItem('cj2dlcweapons') == 'true') {
			this.hasWeapons = true;
		}
		
		ig.system.dlcWeapon = localStorage.getItem('cj2dlcweapon');
	},
	update: function() {
		this.frame++;
		this.parent();
		if (ig.input.pressed('left') && this.choice > 0) { this.choice--; }
		if (ig.input.pressed('right') && this.choice < (this.hasWeapons?5:2)) { this.choice++; }
		if (ig.input.pressed('shoot') && this.hasWeapons) {
			switch(this.choice) {
				case 0: localStorage.setItem('cj2dlcweapon', '1'); ig.system.dlcWeapon = '1'; break;
				case 1: localStorage.setItem('cj2dlcweapon', '4'); ig.system.dlcWeapon = '4'; break;
				case 2: localStorage.setItem('cj2dlcweapon', '5'); ig.system.dlcWeapon = '5'; break;
				case 3: localStorage.setItem('cj2dlcweapon', '6'); ig.system.dlcWeapon = '6'; break;
				case 4: localStorage.setItem('cj2dlcweapon', '0'); ig.system.dlcWeapon = '0'; break;
				case 5: ig.system.frame = this.frame; ig.system.setGame(IntroScreen); break;
			}
		}
		else if(ig.input.pressed('shoot')) {
			switch (this.choice) {
				case 0: localStorage.setItem('cj2dlcweapons', 'true'); this.hasWeapons = true; break;
				case 2: ig.system.frame = this.frame; ig.system.setGame(IntroScreen); break;
			}
		}
	},
	draw: function() {
		var y;
		var x = ig.system.dlcWeapon;
		switch (x) {
			case '1': y = 'FLAMETHROWER'; break;
			case '4': y = 'SHOTGUN'; break;
			case '5': y = 'MAGNUM'; break;
			case '6': y = 'AUTO-SHOTGUN'; break;
			default: y = 'NONE'; break;
		}
		this.parent();
		this.background.draw((this.frame%64-64)/2, 0);
		this.logo.draw(0, 0);
		if (this.hasWeapons) {
			this.mainText.draw('USE FLAMETHROWER', 24 * (ig.system.width/320), 30 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
			this.mainText.draw('USE SHOTGUN', 30 * (ig.system.width/320), 45 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
			this.mainText.draw('USE MAGNUM', 36 * (ig.system.width/320), 60 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
			this.mainText.draw('USE AUTO-SHOTGUN', 42 * (ig.system.width/320), 75 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
			this.mainText.draw('USE TRADITIONAL WEAPONS', 48 * (ig.system.width/320), 90 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
			this.mainText.draw('BACK', 54 * (ig.system.width/320), 105 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
			this.mainText.draw('CURRENT WEAPON: ' + y, ig.system.width/2, 175 * (ig.system.height/240), ig.Font.ALIGN.CENTER);
		}
		else {
			this.mainText.draw('BUY WEAPONS ($0.99)', 24 * (ig.system.width/320), 30 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
			this.mainText.draw('RESTORE PURCHASES', 30 * (ig.system.width/320), 45 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
			this.mainText.draw('BACK', 36 * (ig.system.width/320), 60 * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		}
		
		this.mainText.draw('>', (16 + (6*this.choice)) * (ig.system.width/320), (30 + (15*this.choice)) * (ig.system.height/240), ig.Font.ALIGN.LEFT);
		
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
		this.mainText.draw('Press "Shoot" to Return', ig.system.width/2, 50, ig.Font.ALIGN.CENTER);
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
		localStorage.setItem("cj2level", 'end');
		ig.system.level = 'end';
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
		this.mainText.draw('EPISODE I', ig.system.width/2, 90, ig.Font.ALIGN.CENTER);
		this.mainText.draw('Press "Shoot" to Return', ig.system.width/2, 140, ig.Font.ALIGN.CENTER);
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	}
});
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
if(ig.ua.mobile) { ig.Sound.enabled = false; }
ig.setNocache(true);
ig.main( '#canvas', IntroScreen, 60, 320, 240, 2 );

});
