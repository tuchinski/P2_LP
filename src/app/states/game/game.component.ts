import { Component, OnInit } from "@angular/core";
import * as Phaser from 'phaser-ce/build/custom/phaser-split';
import { PathLocationStrategy } from '@angular/common';

let temp;

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.scss"]
})

export class GameComponent extends Phaser.State {
	game: Phaser.Game;
	bmdSprite: Phaser.Sprite;
	manager: any;

	nameLevel: any;

	a1: any;
	inimigosZombie: any;
	inimigosPedra: any;
	inimigosGoblin: any;
	inimigosDevil: any;
	key: any;

	it: number = 1;
	platforms: any;
	map: any;
	layer: any;
	layer2: any;
	player: any;
	potesVida: any;
	potesEscudo: any;
	potesAttack: any;

	textoAtaque: any;

	sfx:any;
	som:any;
	hud: any;

	playerX: any
	playerY: any
	vidaPlayer: any;
	shieldPlayer: any;
	attackPlayer: any;

	atualMap: any;


	cursors: any;
	fireButton: any;

	weapon: any;

	bullets: any;

	score: number = 0;
	scoreText: any;

	inventory: any;

	leftKey: any;
	rightKey: any;
	spaceKey: any;

	a = 1
	preload() {
		this.game.load.tilemap(
			"world",
			"assets/tilemaps/world_2.json",
			null,
			Phaser.Tilemap.TILED_JSON
		);

		this.game.load.tilemap(
			'mundo',
			'assets/mapasNovos/mapadailzi.json',
			null,
			Phaser.Tilemap.TILED_JSON
		);

		this.game.load.tilemap(
			'lv1',
			'assets/mapasNovos/mapaLv1.json',
			null,
			Phaser.Tilemap.TILED_JSON
		);

		this.game.load.tilemap(
			'lv2',
			'assets/mapasNovos/mapaLv2.json',
			null,
			Phaser.Tilemap.TILED_JSON
		);

		this.game.load.tilemap(
			'lv3',
			'assets/mapasNovos/mapaLv3.json',
			null,
			Phaser.Tilemap.TILED_JSON
		);

		this.nameLevel = ['lv1', 'lv2', 'lv3']

		// this.game.load.image("tiles", "assets/tiles/world_2.png");

		this.game.load.spritesheet("phaser", "assets/sprites/phaser-dude.png");

		this.game.load.spritesheet('explosion', 'assets/tiles/explosion.png', 56, 56);
		// this.game.load.image("bullet", "assets/sprites/fireball.png");

		// this.game.load.image("sky", "assets/sprites/sky.png");
		// this.game.load.image("ground", "assets/sprites/ground.png");

		this.game.load.image('shot', 'assets/tiles/shot.png')


		this.game.load.image('tileset', 'assets/mapasNovos/tileset.png')
		this.game.load.image('fundo', 'assets/mapasNovos/fundo.png')
		this.game.load.image('porta', 'assets/mapasNovos/porta.png')
		this.game.load.image('shiny_rpg_potions_32x32', 'assets/tiles/shiny_rpg_potions_32x32.png')
		this.game.load.image('poteDeVida', 'assets/tiles/poteVida.png')
		this.game.load.image('poteDeEscudo', 'assets/tiles/poteShield.png')
		this.game.load.image('poteDeAtaque', 'assets/tiles/poteAtaque.png')
		this.game.load.image('pedra', 'assets/tiles/bixodepredra.png')
		this.game.load.image('devil', 'assets/tiles/devil.png')
		this.game.load.image('goblin', 'assets/tiles/goblin.png')
		this.game.load.image('key', 'assets/tiles/key.png')

		this.game.load.audio('sfx:hit','assets/sounds/hit12.m4a')
		this.game.load.audio('sfx:background','assets/sounds/background.mp3')

		this.game.load.image('zombie', 'assets/sprites/zombie/female/Idle (1).png')


		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)

		this.inventory = this.game.input.keyboard.addKey(Phaser.KeyCode.I)
		this.inventory.open = 0;
		this.inventory.onDown.add(this.openInventory, this)




		// this.inventory

	}

	openInventory() {
		// console.log("Foi")


		// console.log('temp')
		// console.log(temp)
		// this.game.state.start('Fight', true, false,
		// 	{ x: this.player.x, y: this.player.y, inimigos: temp })
		console.log(this.player.x)
		console.log(this.player.y)

		// this.inventory.open = 0
	}

	createText(x, y, string, size = 16) {
		let style = { font: `bold ${size}px Arial`, fill: 'white' }
		let text = this.game.add.text(x, y, string, style)
		//text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
		text.stroke = '#000000';
		text.strokeThickness = 2;
		text.anchor.setTo(0.5, 0.5)
		text.fixedToCamera = true
		return text
	}

	init(dict) {
		this.playerX = dict.x
		this.playerY = dict.y
		this.atualMap = dict.atualMap
		this.atualMap = dict.level
		this.vidaPlayer = dict.vida
		this.shieldPlayer = dict.shield
		this.attackPlayer = dict.attack

		// this.inimigos = dict.inimigos

		console.log(dict)
	}

	create() {
		console.log("antes")
		console.log(this.inimigosZombie)

		this.sfx = {
			hit:this.game.add.audio('sfx:hit'),
			background:this.game.add.audio('sfx:background')
		}
		
		this.sfx.background.loop = true
		this.sfx.background.play()

		this.createTileMap();

		console.log("depois")
		console.log(this.inimigosZombie)


		this.hud = {
			text1: this.createText(this.game.width * 1 / 9, 50, 'HEALTH: 20'),
			text2: this.createText(this.game.width * 1 / 9, 80, 'SHIELD: 0'),
			text3: this.createText(this.game.width * 1 / 9, 110, 'ATTACK: 0')
			//fps: createHealthText(game.width*6/9, 50, 'FPS'),
		}


		this.weapon = this.game.add.weapon(1, 'shot')

		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

		//  The speed at which the bullet is fired
		this.weapon.bulletSpeed = 600;

		//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
		this.weapon.fireRate = 100;
		console.log(this.weapon)

		this.player = this.game.add.sprite(this.playerX, this.playerY, 'phaser')
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.anchor.setTo(0.5, 0.5)

		// this.player.bullets = this.createBullets()
		this.weapon.trackSprite(this.player, (this.player.width) / 2, (this.player.height) / 2, true)

		this.game.add.existing(this.player)
		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1); // smooth   
		this.player.health = this.vidaPlayer
		this.player.shield = this.shieldPlayer
		this.player.body.bounce.y = 0.2
		this.player.body.bounce.x = 0.2
		this.player.attack = this.attackPlayer
		this.player.hasKey = false

		this.a1 = new Enemy(this.game, this.playerX, this.playerY, 'shot')
		this.a1.anchor
		console.log("this.a1")
		console.log(this.a1)


		this.updateHud()



	}

	update() {

		// //  Reset the players velocity (movement)
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if (this.cursors.left.isDown) {
			//  Move to the left
			this.player.body.velocity.x = -150;
			// this.player.scale.x = -1
			// this.player.scale.y = -1
			// this.player.angle = 180

			// this.player.animations.play("left");
		} else if (this.cursors.right.isDown) {
			//  Move to the right
			this.player.body.velocity.x = 150;
			// this.player.scale.x = -1
			// this.player.scale.y = 1
			// this.player.angle = 0

			// this.player.animations.play("right");
		}
		if (this.cursors.up.isDown) {
			this.player.body.velocity.y = -150;

		} else if (this.cursors.down.isDown) {
			this.player.body.velocity.y = 150;
		}

		else {
			//  Stand still
			// this.player.animations.stop();

			// this.player.frame = 4;
		}
		if (this.fireButton.isDown) {
			this.weapon.fire();
			console.log(this.player.angle)
		}

		this.game.physics.arcade.collide(this.player, this.layer);
		this.game.physics.arcade.collide(this.player, this.inimigosZombie, this.bateNoInimigo, null, this)
		this.game.physics.arcade.collide(this.player, this.inimigosPedra, this.bateNoInimigo, null, this)
		this.game.physics.arcade.collide(this.player, this.potesVida, this.catchPotion, null, this)
		this.game.physics.arcade.collide(this.player, this.potesEscudo, this.catchPotion, null, this)
		this.game.physics.arcade.collide(this.player, this.potesAttack, this.catchPotion, null, this)
		this.game.physics.arcade.collide(this.player, this.key, this.catchKey, null, this)

		this.updateHud()
		this.verifyGameOver()
	}

	verifyGameOver() {
		if (!this.player.alive) {
			this.game.state.start("GameOver", true, true)
		}
	}

	bateNoInimigo(player, enemy) {
		var dano
		this.sfx.hit.play()

		if (enemy.key == 'zombie') {
			dano = 2
			console.log(enemy.health)
		} else if (enemy.key == "pedra") {
			console.log(enemy.health)
			dano = 2
		}
		enemy.damage(player.attack)

		for (var _i = 0; _i < dano; _i++) {
			if (player.shield > 0) {
				player.shield -= 1
			} else {
				player.damage(1)
			}
		}

		this.game.camera.shake(0.01, 200);

		if(player.body.prev.x<player.body.position.x){
			player.x -= 10
		}else if(player.body.prev.x > player.body.position.x){
			player.x += 10
		}else if(player.body.prev.y<player.body.position.y){
			player.y -= 10
		}
		else if(player.body.prev.y>player.body.position.y){
			player.y += 10
		}

		// this.textoAtaque = this.createText(player.body.x, player.body.y,"coisa",10)
		// var tempo = this.game.time.create(false)
		// tempo.add(Phaser.Timer.SECOND,this.mataTexto,this.game)
		// tempo.start()

		// this.textoAtaque.kill()
	}


	// mataTexto(){
	// 	console.log(this.textoAtaque)
	// 	this.textoAtaque.kill()
	// }
	
	updateHud() {
		this.hud.text1.text = "HEALTH: " + this.player.health
		this.hud.text2.text = "SHIELD: " + this.player.shield
		this.hud.text3.text = "ATTACK: " + this.player.attack
	}

	// collectBullet(player, bullet) {
	//   bullet.kill();
	//   this.score += 10;
	//   this.scoreText.text = "Pontos: " + this.score;
	// }

	createTileMap() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// this.map = this.game.add.tilemap('mundo');
		// console.log("mapaaaaaaaaaa")
		console.log(this.nameLevel[this.atualMap])
		this.map = this.game.add.tilemap(this.nameLevel[this.atualMap]);

		this.map.addTilesetImage('tileset');
		this.map.addTilesetImage('fundo');
		this.map.addTilesetImage('porta');
		this.map.addTilesetImage('shiny_rpg_potions_32x32');



		// this.layer = this.map.createLayer("Camada de Tiles 3")
		if (this.nameLevel[this.atualMap] == 'lv1') {
			this.layer = this.map.createLayer("Camada de Tiles 2")
			this.map.setCollisionBetween(4, 6, true, 0)
			this.map.setCollisionBetween(12, 16, true, 0)
			this.map.setCollisionBetween(12, 16, true, 0)
			this.map.setCollisionBetween(20, 24, true, 0)
			this.map.setCollisionBetween(28, 32, true, 0)
			this.map.setTileIndexCallback(2, this.nextLevel, this)
			this.map.setTileIndexCallback(70, this.catchPotion, this)
			this.map.setTileIndexCallback(80, this.enemyAhead, this)
			// console.log(this.layer)

			if (!this.inimigosZombie) {
				this.inimigosZombie = this.game.add.group()
				this.map.createFromObjects("Object Layer 1", 136, 'zombie', 0, true, true, this.inimigosZombie, Enemy)

			}
		}
		else if (this.nameLevel[this.atualMap] == 'lv2') {
			console.log("entrei no lv2")
			this.layer = this.map.createLayer("Camada de Tiles 2")

			this.map.setCollisionBetween(13, 15, true, 0)
			this.map.setCollisionBetween(21, 25, true, 0)
			this.map.setCollisionBetween(29, 33, true, 0)
			this.map.setCollisionBetween(37, 41, true, 0)
			this.map.setTileIndexCallback(11, this.nextLevel, this)
			// this.map.setTileIndexCallback(70, this.catchPotion, this)
			this.potesVida = this.game.add.group()
			this.map.createFromObjects('Object Layer 1', 70, 'poteDeVida', 0, true, true, this.potesVida, Potions)

			this.potesEscudo = this.game.add.group();
			this.map.createFromObjects('Object Layer 1', 160, 'poteDeEscudo', 0, true, true, this.potesEscudo, Potions)

			this.potesAttack = this.game.add.group();
			this.map.createFromObjects('Object Layer 1', 120, 'poteDeAtaque', 0, true, true, this.potesAttack, Potions)


			this.inimigosZombie = this.game.add.group();
			this.map.createFromObjects("Object Layer 1", 109, 'zombie', 0, true, true, this.inimigosZombie, Enemy)
			this.inimigosZombie.forEach(function (a) {
				a.health = 1
			})

			this.key = this.game.add.group();
			this.map.createFromObjects('Object Layer 1', 165, 'key', 0, true, true, this.key, Potions)

			this.inimigosPedra = this.game.add.group()
			this.map.createFromObjects("Object Layer 1", 140, 'pedra', 0, true, true, this.inimigosPedra, Enemy)
			this.inimigosPedra.forEach(function (a) {
				a.health = 5
			})


		}

		else if (this.nameLevel[this.atualMap] == 'lv3') {
			this.layer = this.map.createLayer("Camada de Tiles 2")

			this.map.setCollisionBetween(4, 6, true, 0)
			this.map.setCollisionBetween(12, 16, true, 0)
			this.map.setCollisionBetween(12, 16, true, 0)
			this.map.setCollisionBetween(20, 24, true, 0)
			this.map.setCollisionBetween(28, 32, true, 0)
			this.map.setTileIndexCallback(11, this.nextLevel, this)
			// this.map.setTileIndexCallback(70, this.catchPotion, this)
			this.potesVida = this.game.add.group()
			this.map.createFromObjects('Object Layer 1', 69, 'poteDeVida', 0, true, true, this.potesVida, Potions)

			this.potesEscudo = this.game.add.group();
			this.map.createFromObjects('Object Layer 1', 160, 'poteDeEscudo', 0, true, true, this.potesEscudo, Potions)

			this.inimigosZombie = this.game.add.group();
			this.map.createFromObjects("Object Layer 1", 108, 'zombie', 35, true, true, this.inimigosZombie, Enemy)

			this.inimigosZombie.forEach(function (a) {
				a.health = 1
			})

			this.key = this.game.add.group();
			this.map.createFromObjects('Object Layer 1', 164, 'key', 0, true, true, this.key, Potions)

			this.inimigosPedra = this.game.add.group()
			this.map.createFromObjects("Object Layer 1", 139, 'pedra', 0, true, true, this.inimigosPedra, Enemy)
			this.inimigosPedra.forEach(function (a) {
				a.health = 5
			})

			this.potesAttack = this.game.add.group();
			this.map.createFromObjects('Object Layer 1', 119, 'poteDeAtaque', 0, true, true, this.potesAttack, Potions)

		}

		// this.layer.debug = true



		this.layer.resizeWorld()


	}
	nextLevel() {
		if (this.player.hasKey) {
			console.log("passou de nível")
			if (this.nameLevel[this.atualMap] == 'lv1') {
				this.game.state.start("Game", true, false,
					{ x: 154, y: 62, level: 1, vida: this.player.health, shield: this.player.shield, attack: this.player.attack })
			} else if (this.nameLevel[this.atualMap] == 'lv2') {
				this.game.state.start("Game", true, false,
					{ x: 2907, y: 861, level: 2, vida: this.player.health, shield: this.player.shield, attack: this.player.attack })
			}
		} else {
			this.player.x = this.playerX
			this.player.y = this.playerY
		}
	}

	catchPotion(player, potion) {
		if (potion.key == 'poteDeVida') {
			this.player.health += 1
			potion.kill()
		} else if (potion.key == 'poteDeEscudo') {
			this.player.shield += 1
			potion.kill()
			console.log("inimigo")
		} else if (potion.key == 'poteDeAtaque') {
			this.player.attack += 1
			potion.kill()
		}
	}

	catchKey(player, key) {
		player.hasKey = true
		key.kill()

	}

	enemyAhead() {
	}



	// createLayer() {
	//   this.game.physics.startSystem(Phaser.Physics.ARCADE);

	//   this.map = this.game.add.tilemap("world");
	//   // this.map = this.game.add.tilemap("mundo");

	//   this.map.addTilesetImage("tiles");
	//   // this.map.addTilesetImage();

	//   this.layer = this.map.createLayer("Tile Layer 1");



	//   this.layer.resizeWorld();
	// }

	render() {

		// this.game.debug.body(this.player)
		// this.game.debug.body(this.weapon)
		// if (this.it == 1) {
		// 	console.log(this.player.width)
		// 	console.log(this.player.height)
		// 	this.it = this.it + 1
		// }
		// console.log(this.inventory)

	}
}

export class Enemy extends Phaser.Sprite {
	health: any;
	body: any;
	anchor: any;
	constructor(game, x, y, img) {
		super(game, x, y, img)
		game.physics.arcade.enable(this)
		this.health = 10
		this.body.immovable = true
		this.anchor.setTo(0.5, 0.5)
	}
}

export class Potions extends Phaser.Sprite {
	health: any;
	body: any;
	anchor: any;
	constructor(game, x, y, img) {
		super(game, x, y, img)
		game.physics.arcade.enable(this)
		this.health = 1
		this.body.immovable = true
		this.anchor.setTo(0.5, 0.5)
	}
}

export class GameOverComponent extends Phaser.State {
	game: any;
	hud: any;
	sfx: any;

	createText(x, y, string, size = 16) {
		let style = { font: `bold ${size}px Arial`, fill: 'white' }
		let text = this.game.add.text(x, y, string, style)
		//text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
		text.stroke = '#000000';
		text.strokeThickness = 2;
		text.anchor.setTo(0.5, 0.5)
		text.fixedToCamera = true
		return text
	}
	preload(){
		this.game.load.audio('sfx:gameOver','assets/sounds/gameover.mp3')
	}

	create() {
		this.hud = {
			text1: this.createText(this.game.width * 1 / 2, 100, 'GAME OVER')
		}

		this.sfx = {
			gameOver:this.game.add.audio('sfx:gameOver')
		}
		this.sfx.gameOver.play()
	}
}

export class WinComponent extends Phaser.State {
	game: any;
	hud: any;

	createText(x, y, string, size = 16) {
		let style = { font: `bold ${size}px Arial`, fill: 'white' }
		let text = this.game.add.text(x, y, string, style)
		//text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
		text.stroke = '#000000';
		text.strokeThickness = 2;
		text.anchor.setTo(0.5, 0.5)
		text.fixedToCamera = true
		return text
	}

	create() {
		this.hud = {
			text1: this.createText(this.game.width * 1 / 2, 100, 'GAME OVER')
		}
	}
}


export class FightComponent extends Phaser.State {
	game = Phaser.Game;
	count = 0;
	tecla: any;

	x: any
	y: any
	inimigosMain: any


	init(dict) {
		this.x = dict.x
		this.y = dict.y
		this.inimigosMain = dict.inimigos
		this.inimigosMain = dict.inimigos

	}



	preload() {
		this.game.load.image('fundo', 'assets/mapasNovos/fundo.png')
		this.game.load.image('shot', 'assets/tiles/shot.png')
		this.count = 0
	}

	create() {
		this.game.add.text(80, 80, "tela da lutinha", { font: '50px Arial', fill: '#ffffff' })
		this.tecla = this.game.input.keyboard.addKey(Phaser.KeyCode.I)
		this.tecla.onDown.add(this.volta, this)
	}

	volta() {
		this.game.state.start('Game', true, false,
			{ x: this.x, y: this.y, inimigos: this.inimigosMain })
	}

	update() {
		if (this.count < 60) {
			// console.log("coisinha linda")
		}
		this.count = this.count + 1

		// if(tecla)
	}

}