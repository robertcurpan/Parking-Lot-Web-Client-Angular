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
  public errorMessageWhenRemovingTicket = "";

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
    if (ticket.vehicle.vehicleType === "MOTORCYCLE") {
      return "motorcycle-avatar";
    } else if (ticket.vehicle.vehicleType === "CAR") {
      return "car-avatar";
    } else if (ticket.vehicle.vehicleType === "TRUCK") {
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

  removeTicket(parkingSpot: ParkingSpot) {
    this.requestsService.leaveParkingLot(parkingSpot).subscribe({
      next: (data) => {
        this.updateParkingLotStatusWhenDriverLeaves(data);
        this.errorMessageWhenRemovingTicket = "";
      },
      error: (errorMessage) => {
        this.errorMessageWhenRemovingTicket = errorMessage;
      }
    });
  }

  updateParkingLotStatusWhenDriverLeaves(ticket: Ticket) {
    // Vom updata parkingLotStatus (Scoatem ticket-ul din lista de tickets si scoatem vehicleId din parkingSPot + updatam versiunea)
    this.parkingLotStatus.tickets = this.arrayRemoveTicket(this.parkingLotStatus.tickets, ticket);
    this.updateParkingSpotInParkingLotStatus(ticket.parkingSpot);
  }

  updateParkingSpotInParkingLotStatus(parkingSpot: ParkingSpot) {
    for(let index = 0; index < this.parkingLotStatus.parkingSpots.length; ++index) {
        if(this.parkingLotStatus.parkingSpots[index].id == parkingSpot.id) {
            this.parkingLotStatus.parkingSpots[index] = parkingSpot;
            break;
        }
    }
  }

  arrayRemoveTicket(arr: Array<Ticket>, ticket: Ticket) {
    return arr.filter(function(currentTicket) {
        return currentTicket.parkingSpot.id != ticket.parkingSpot.id;
    });
  }
  

}
