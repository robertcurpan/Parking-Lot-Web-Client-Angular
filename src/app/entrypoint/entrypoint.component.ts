import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrypoint',
  templateUrl: './entrypoint.component.html',
  styleUrls: ['./entrypoint.component.css']
})
export class EntrypointComponent {

  public renderedView: string = "login";
  public username: string = "";
  public loggedInAsVIP: boolean = false;

  constructor() { }

}
