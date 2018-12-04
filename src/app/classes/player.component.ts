import { Component, OnInit } from "@angular/core";
import * as Phaser from "phaser-ce/build/custom/phaser-split";
import { PathLocationStrategy } from "@angular/common";

@Component({
	selector: "app-player",
	templateUrl: "./player.component.html",
	styleUrls: ["./player.component.scss"]
})

export class Player extends Phaser.Sprite{
    constructor(game, x, y, img){
        super(game,x,y,img)
    }
}