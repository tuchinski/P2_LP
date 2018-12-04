import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { StatesModule } from "./states/states.module";
import { Player } from "./classes/player.component"

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StatesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
