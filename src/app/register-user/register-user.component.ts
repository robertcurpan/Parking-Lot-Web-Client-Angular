import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../message-popup/message-popup.component';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  constructor(private requestsService: RequestsService, private dialog: MatDialog) { }

  register(username: string, password: string) {
    this.requestsService.registerVipUser(username, password).subscribe ({
      next: (data) => {
        this.dialog.open(MessagePopupComponent, {data: { successStatus: 'Success', infoMessage: "Registration successful!" }});
      },
      error: (errorMessage) => {
        this.dialog.open(MessagePopupComponent, {data: { successStatus: 'Error', infoMessage: "Registration failed!" }});
      }
    });
  }

}
