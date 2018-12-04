import { Component, OnInit } from "@angular/core";
import * as Phaser from "phaser-ce/build/custom/phaser-split";
import { PathLocationStrategy } from "@angular/common";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.scss"]
})
export class GameComponent extends Phaser.State {
	game: Phaser.Game;
	bmdSprite: Phaser.Sprite;
	manager: Phaser.StateManager;

	it:number = 1;
	platforms: any;
	map: any;
	layer: any;
	layer2: any;
	player: any;

	hud: any;

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

		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
		
		this.inventory = this.game.input.keyboard.addKey(Phaser.KeyCode.I)
		this.inventory.open=0;
		this.inventory.onDown.add(this.openInventory, this)
		console.log(this.inventory)

		// this.inventory

	}

	openInventory(){
		console.log("Foi")
		if(this.inventory.open == 0){
			this.inventory.open = 1
			// this.game.pause = true
			console.log("Fosdasai")

			this.game.paused = true
		}

		
		this.inventory.open = 0
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



	create() {
		this.createTileMap();

		this.hud = {
			text1: this.createText(this.game.width * 1 / 9, 50, 'HEALTH: 20'),
			text2: this.createText(this.game.width * 1 / 9, 80, 'SHIELS: 0')
			//fps: createHealthText(game.width*6/9, 50, 'FPS'),
		}

		
		this.weapon = this.game.add.weapon(1, 'shot')
		
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		
		//  The speed at which the bullet is fired
		this.weapon.bulletSpeed = 600;
		
		//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
		this.weapon.fireRate = 100;
		console.log(this.weapon)
		
		this.player = this.game.add.sprite(148, 544, 'phaser')
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.anchor.setTo(0.5, 0.5)
		
		// this.player.bullets = this.createBullets()
		this.weapon.trackSprite(this.player, (this.player.width) / 2, (this.player.height) / 2, true)
		
		this.game.add.existing(this.player)
		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1); // smooth   
		this.player.health = 5
		this.player.shield = 0
		
		
		this.updateHud()

		// //  We're going to be using physics, so enable the Arcade Physics system
		// this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// //  A simple background for our game
		// this.game.add.sprite(0, 0, "sky");

		// //  The platforms group contains the ground and the 2 ledges we can jump on
		// this.platforms = this.game.add.group();

		// //  We will enable physics for any object that is created in this group
		// this.platforms.enableBody = true;

		// // Here we create the ground.
		// var ground = this.platforms.create(
		//   0,
		//   this.game.world.height - 64,
		//   "ground"
		// );

		// //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
		// ground.scale.setTo(2, 2);

		// //  This stops it from falling away when you jump on it
		// ground.body.immovable = true;

		// //  Now let's create two ledges
		// var ledge = this.platforms.create(400, 400, "ground");

		// ledge.body.immovable = true;

		// ledge = this.platforms.create(-150, 250, "ground");

		// ledge.body.immovable = true;

		// this.player = this.game.add.sprite(
		//   32,
		//   this.game.world.height - 150,
		//   "phaser"
		// );

		// //  We need to enable physics on the player
		// this.game.physics.arcade.enable(this.player);

		// //  Player physics properties. Give the little guy a slight bounce.
		// this.player.body.bounce.y = 0.2;
		// this.player.body.gravity.y = 300;
		// this.player.body.collideWorldBounds = true;

		// //  Our two animations, walking left and right.
		// this.player.animations.add("left", [0, 1, 2, 3], 10, true);
		// this.player.animations.add("right", [5, 6, 7, 8], 10, true);

		// this.bullets = this.game.add.group();

		// this.bullets.enableBody = true;

		// //  Here we'll create 12 of them evenly spaced apart
		// for (var i = 0; i < 12; i++) {
		//   //  Create a star inside of the 'stars' group
		//   var bullet = this.bullets.create(i * 70, 0, "bullet");

		//   //  Let gravity do its thing
		//   bullet.body.gravity.y = 6;

		//   //  This just gives each star a slightly random bounce value
		//   bullet.body.bounce.y = 0.7 + Math.random() * 0.2;
		// }

		// this.scoreText = this.game.add.text(16, 16, "Pontos: 0", {
		//   fontSize: "32px",
		//   fill: "#000"
		// });

	}

	update() {
		// this.game.physics.arcade.collide(this.bullets, this.platforms);

		// this.game.physics.arcade.overlap(
		//   this.player,
		//   this.bullets,
		//   this.collectBullet,
		//   null,
		//   this
		// );

		// var hitPlatform = this.game.physics.arcade.collide(
		//   this.player,
		//   this.platforms
		// );



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

		// //  Allow the player to jump if they are touching the ground.
		// if (
		//   this.cursors.up.isDown &&
		//   this.player.body.touching.down &&
		//   hitPlatform
		// ) {
		//   this.player.body.velocity.y = -350;
		// }

		this.updateHud()
	}

	updateHud() {
		this.hud.text1.text = "HEALTH: " + this.player.health
		this.hud.text2.text = "SHIELD: " + this.player.shield
	}

	// collectBullet(player, bullet) {
	//   bullet.kill();
	//   this.score += 10;
	//   this.scoreText.text = "Pontos: " + this.score;
	// }

	createTileMap() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// this.map = this.game.add.tilemap('mundo');
		this.map = this.game.add.tilemap('lv1');

		this.map.addTilesetImage('tileset');
		this.map.addTilesetImage('fundo');
		this.map.addTilesetImage('porta');
		this.map.addTilesetImage('shiny_rpg_potions_32x32');

		// this.layer = this.map.createLayer("Camada de Tiles 3")
		this.layer = this.map.createLayer("Camada de Tiles 2")
		this.map.setCollisionBetween(4, 6, true, 0)
		this.map.setCollisionBetween(12, 16, true, 0)
		this.map.setCollisionBetween(12, 16, true, 0)
		this.map.setCollisionBetween(20, 24, true, 0)
		this.map.setCollisionBetween(28, 32, true, 0)
		this.map.setTileIndexCallback(2,this.nextLevel,this)
		this.map.setTileIndexCallback(70,this.catchPotion,this)
		this.map.setTileIndexCallback(80,this.enemyAhead,this)
		console.log(this.layer)
		
		this.layer.debug = true
		


		this.layer.resizeWorld()


	}
	nextLevel(){
		console.log("passou de nível")
	}
	
	catchPotion(){
		console.log("passou de nível")		
	}
	
	enemyAhead(){
		console.log("inimigo")		
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
export class FightComponent extends Phaser.State {


}