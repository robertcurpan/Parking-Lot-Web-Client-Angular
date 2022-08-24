import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  
  @Output() public changeViewEvent = new EventEmitter();

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
  }

  onDisplayTickets() {
    this.utilService.sendRequestCommand("tickets");
  }

  onDisplayParkingSpots() {
    this.utilService.sendRequestCommand("parkingSpots");
  }

  backToLoginScreen() {
    this.changeViewEvent.emit('login');
  }

}
