import { Component, OnInit } from '@angular/core';
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

}
