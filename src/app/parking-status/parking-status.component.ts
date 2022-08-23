import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ParkingLotStatus } from '../parking-lot-status';
import { ParkingSpot } from '../parking-spot';
import { RequestsService } from '../requests.service';
import { Ticket } from '../ticket';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.css']
})
export class ParkingStatusComponent implements OnInit {

  public receiveRequestCommandSubscription: Subscription;

  public ticketsOrParkingSpots: string = "";
  public parkingLotStatus: ParkingLotStatus = new ParkingLotStatus();

  constructor(private requestsService: RequestsService, private utilService: UtilService) { 
    this.receiveRequestCommandSubscription = this.utilService.getRequestCommand().subscribe((requestCommand: string) => {
      if(requestCommand === "tickets") {
        this.onDisplayTickets();
      } else if (requestCommand === "parkingSpots") {
        this.onDisplayParkingSpots();
      }
    })
  }

  ngOnInit(): void {
  }

  onDisplayTickets() {
    this.requestsService.getTickets().subscribe (
      data => this.parkingLotStatus.setTickets(data)
    );
    this.ticketsOrParkingSpots = "tickets";
  }

  onDisplayParkingSpots() {
    this.requestsService.getParkingSpots().subscribe (
      data => this.parkingLotStatus.setParkingSpots(data)
    );
    this.ticketsOrParkingSpots = "parkingSpots";
  }

  getVehicleAvatar(ticket: Ticket) {
    if (ticket.vehicle.type === "MOTORCYCLE") {
      return "motorcycle-avatar";
    } else if (ticket.vehicle.type === "CAR") {
      return "car-avatar";
    } else if (ticket.vehicle.type === "TRUCK") {
      return "truck-avatar";
    }
    return "motorcycle-avatar";
  }

  getSpotAvatar(parkingSpot: ParkingSpot) {
    console.log(parkingSpot.spotType);
    if (parkingSpot.spotType === "SMALL") {
      return "small-avatar";
    } else if (parkingSpot.spotType === "MEDIUM") {
      return "medium-avatar";
    } else if (parkingSpot.spotType === "LARGE") {
      return "large-avatar";
    }
    return "large-avatar";
  }
  

}
