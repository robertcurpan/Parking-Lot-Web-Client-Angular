import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../message-popup/message-popup.component';
import { RequestsService } from '../requests.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  private jwtHelper = new JwtHelperService();

  @Output() public changeViewEvent = new EventEmitter();
  @Output() public sendUsernameEvent = new EventEmitter();

  constructor(private requestsService: RequestsService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login(username: string, password: string, accountType: string) {
    this.requestsService.login(username, password).subscribe({
      next: (data) => {
        console.log("Success!", data);
        console.log(data.jwt);
        this.requestsService.setJwtForAuthorization(data.jwt);
        let decodedToken = this.jwtHelper.decodeToken(data.jwt);
        let user = decodedToken.sub;
        this.sendUsernameEvent.emit(user);
        this.changeViewEvent.emit(accountType);
      },
      error: (errorMessage) => {
        console.log("Error!", errorMessage);
        this.dialog.open(MessagePopupComponent, {data: { successStatus: 'Error', infoMessage: "Authentication failed! Username or password incorrect!" }});
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
