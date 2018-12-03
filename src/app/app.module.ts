import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { StatesModule } from "./states/states.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StatesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
