import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../message-popup/message-popup.component';
import { RequestsService } from '../services/requests.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

  private jwtHelper = new JwtHelperService();

  @Output() public changeViewEvent = new EventEmitter();
  @Output() public sendUsernameEvent = new EventEmitter();
  @Output() public sendLoggedInStatusEvent = new EventEmitter(); 

  constructor(private requestsService: RequestsService, private dialog: MatDialog) { }

  login(username: string, password: string) {
    this.requestsService.login(username, password).subscribe({
      next: (data) => {
        this.requestsService.setJwtForAuthorization(data.jwt);
        let decodedToken = this.jwtHelper.decodeToken(data.jwt);
        let user = decodedToken.sub;
        let accountType = data.accountType;
        this.sendLoggedInStatusEvent.emit(true);
        this.sendUsernameEvent.emit(user);
        this.changeViewEvent.emit(accountType);
      },
      error: (errorMessage) => {
        this.dialog.open(MessagePopupComponent, {data: { successStatus: 'Error', infoMessage: "Authentication failed! Username or password incorrect!" }});
      }
    });

  }

  continueAsNonVIP() {
    this.requestsService.login("user", "user").subscribe({
      next: (data) => {
        this.requestsService.setJwtForAuthorization(data.jwt);
        let decodedToken = this.jwtHelper.decodeToken(data.jwt);
        let user = decodedToken.sub;
        let accountType = data.accountType;
        this.sendLoggedInStatusEvent.emit(false);
        this.sendUsernameEvent.emit(user);
        this.changeViewEvent.emit(accountType);
      },
      error: (errorMessage) => {
        this.dialog.open(MessagePopupComponent, {data: { successStatus: 'Error', infoMessage: "Error!" }});
      }
    });
  }

}

class User {
  constructor (
    public username: string,
    public password: string,
    public accountType: string
  ) {}
}
