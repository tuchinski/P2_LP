import { Component } from "@angular/core";
import "phaser-ce/build/custom/pixi";
import "phaser-ce/build/custom/p2";
import * as Phaser from "phaser-ce/build/custom/phaser-split";
import { PathLocationStrategy } from "@angular/common";
import { PreloadComponent } from "./states/preload/preload.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  game: Phaser.Game;
  state: Phaser.State;

  constructor() {
    this.game = new Phaser.Game(600 , 400, Phaser.AUTO, "content", {
      create: this.create
    });
  }
  create() {
    this.state.add("Preloader", PreloadComponent, true);
  }
}
