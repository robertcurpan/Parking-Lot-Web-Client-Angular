import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent {
  
  @Input() public username: string = "";
  @Output() public changeViewEvent = new EventEmitter();
  public sidenavContentView = "";
  public parkingStatusContentToDisplay = "";

  constructor(private requestsService: RequestsService) { }

  onDisplayTickets() {
    this.sidenavContentView = "parking-status";
    this.parkingStatusContentToDisplay = "tickets";
  }

  onDisplayParkingSpots() {
    this.sidenavContentView = "parking-status";
    this.parkingStatusContentToDisplay = "parkingSpots";
  }

  onRegisterVipUser() {
    this.sidenavContentView = "register-user";

  }

  backToLoginScreen() {
    this.requestsService.clearJwt();
    this.changeViewEvent.emit('login');
  }

}
