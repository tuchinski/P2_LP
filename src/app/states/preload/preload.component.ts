import { Component, OnInit } from "@angular/core";
import * as Phaser from "phaser-ce/build/custom/phaser-split";
import { BootComponent } from "../boot/boot.component";
import { GameComponent } from "../game/game.component";
import { FightComponent } from "../game/game.component";

@Component({
  selector: "app-preload",
  templateUrl: "./preload.component.html",
  styleUrls: ["./preload.component.scss"]
})
export class PreloadComponent extends Phaser.State {
  game: Phaser.Game;

  preload() {}

  create() {
    this.initStates();
    this.setScale();

    this.game.state.start("Boot");
  }

  initStates() {
    this.game.state.add("Boot", BootComponent);
    this.game.state.add("Game", GameComponent);
    this.game.state.add("Fight", FightComponent)
  }

  setScale() {
    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
  }
}
