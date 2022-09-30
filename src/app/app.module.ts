import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ParkingStatusComponent } from './parking-status/parking-status.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { EntrypointComponent } from './entrypoint/entrypoint.component';
import { MessagePopupComponent } from './message-popup/message-popup.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { ClientContentComponent } from './client-content/client-content.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminMenuComponent,
    ParkingStatusComponent,
    LoginScreenComponent,
    EntrypointComponent,
    MessagePopupComponent,
    RegisterUserComponent,
    ClientMenuComponent,
    ClientContentComponent,
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
