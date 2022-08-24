import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  private validAccounts = [
    new User("user", "user", "user"),
    new User("admin", "admin", "admin")
  ]

  @Output() public changeViewEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  login(username: string, password: string) {
    for(let user of this.validAccounts) {
      if(user.username === username && user.password === password) {
        this.changeViewEvent.emit(user.accountType);
        return;
      }
    }

    console.log("Invalid username or password!");
  }

}

class User {
  constructor (
    public username: string,
    public password: string,
    public accountType: string
  ) {}
}
