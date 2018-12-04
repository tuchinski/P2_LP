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
    this.game.load.image("logo", "assets/AtlaRed.svg");
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
        this.game.state.start("Game",true,false,{x:148, y:544});
      },
      this
    );
  }
}
