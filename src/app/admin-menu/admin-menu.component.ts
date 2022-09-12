import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestsService } from '../requests.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  
  @Input() public username: string = "";
  @Output() public changeViewEvent = new EventEmitter();

  constructor(private utilService: UtilService, private requestsService: RequestsService) { }

  ngOnInit(): void {
  }

  onDisplayTickets() {
    this.utilService.sendRequestCommand("tickets");
  }

  onDisplayParkingSpots() {
    this.utilService.sendRequestCommand("parkingSpots");
  }

  backToLoginScreen() {
    this.requestsService.clearJwt();
    this.changeViewEvent.emit('login');
  }

}
