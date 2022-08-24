import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrypoint',
  templateUrl: './entrypoint.component.html',
  styleUrls: ['./entrypoint.component.css']
})
export class EntrypointComponent implements OnInit {

  public renderedView: string = "login";
  
  constructor() { }

  ngOnInit(): void {
  }

}
