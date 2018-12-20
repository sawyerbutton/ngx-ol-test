import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestMapComponent } from './test-map/test-map.component';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';

@NgModule({
  declarations: [
    AppComponent,
    TestMapComponent,
    InteractiveMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
