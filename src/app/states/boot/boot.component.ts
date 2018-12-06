import { Component, OnInit } from "@angular/core";
import * as Phaser from "phaser-ce/build/custom/phaser-split";

@Component({
  selector: "app-boot",
  templateUrl: "./boot.component.html",
  styleUrls: ["./boot.component.scss"]
})
export class BootComponent extends Phaser.State {
  game: Phaser.Game;

  preload() {
    this.game.load.image("logo", "/assets/tiles/titulo.jpg");
  }

  create() {
    let bootLogo: Phaser.Image = this.game.add.image(
      this.game.width * 0.5,
      this.game.height * 0.5,
      "logo"
    );

    bootLogo.anchor.set(0.5, 0.5);

    this.game.time.events.add(
      2000,
      () => {
        // this.game.state.start("Game",true,false,{x:148, y:544,level:0,vida:5,shield:0,attack:2});
        // this.game.state.start("Game",true,false,{x:639.5, y:291.5,level:0,vida:5,shield:0,attack:2});
        this.game.state.start("Game",true,false,{x:154, y:62,level:1,vida:5,shield:0,attack:2});
        // this.game.state.start("Game",true,false,{x:2907, y:861,level:2,vida:5,shield:0,attack:2});
      },
      this
    );
  }
}
