import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ParkingStatusComponent } from './parking-status/parking-status.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { EntrypointComponent } from './entrypoint/entrypoint.component';
import { MessagePopupComponent } from './message-popup/message-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContentComponent,
    AdminMenuComponent,
    ParkingStatusComponent,
    LoginScreenComponent,
    EntrypointComponent,
    MessagePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
