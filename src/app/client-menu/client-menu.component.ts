import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.css']
})
export class ClientMenuComponent {

  @Input() public username: string = "";
  @Input() public loggedInAsVIP: boolean = false;
  @Output() public changeViewEvent = new EventEmitter();

  clientContentToDisplay: string = "";
  displayContent: boolean = false;

  constructor(private requestsService: RequestsService) { }

  onGenerateParkingTicket() {
    this.clientContentToDisplay = "generateParkingTicket";
    this.displayContent = true;
  }

  onLeaveParkingLot() {
    this.clientContentToDisplay = "leaveParkingLot";
    this.displayContent = true;
  }

  backToLoginScreen() {
    this.requestsService.clearJwt();
    this.changeViewEvent.emit('login');
  }

}
