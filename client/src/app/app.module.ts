import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallsComponent } from './calls/calls.component';
import { CallsService } from './calls.service';
import { HttpClientModule } from '@angular/common/http';
import { ControlComponent } from './control/control.component';
import { FormsModule } from '@angular/forms';
import { QueryService } from './query.service';

@NgModule({
  declarations: [AppComponent, CallsComponent, ControlComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [CallsService, QueryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
