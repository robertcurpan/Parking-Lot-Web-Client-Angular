import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Driver } from '../driver';
import { Vehicle } from '../vehicle';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  firstMenuItemContent: boolean = true;
  displayContent: boolean = false;

  @Output() public changeViewEvent = new EventEmitter();

  constructor(private requestsService: RequestsService) { }

  ngOnInit(): void {
  }

  onGenerateParkingTicket() {
    this.firstMenuItemContent = true;
    this.displayContent = true;
  }

  onLeaveParkingLot() {
    this.firstMenuItemContent = false;
    this.displayContent = true;
  }

  backToLoginScreen() {
    this.changeViewEvent.emit('login');
  }

}
