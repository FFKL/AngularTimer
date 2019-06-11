import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TimerPipe } from './shared/timer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerPipe
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
