import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PreloadComponent } from "./preload/preload.component";
import { BootComponent } from "./boot/boot.component";
import { GameComponent } from "./game/game.component";

@NgModule({
  imports: [CommonModule],
  declarations: [PreloadComponent, BootComponent, GameComponent]
})
export class StatesModule {}
