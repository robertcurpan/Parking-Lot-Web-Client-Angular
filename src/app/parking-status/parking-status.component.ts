import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ParkingLotStatus } from '../structures/parking-lot-status';
import { ParkingSpot } from '../structures/parking-spot';
import { RequestsService } from '../services/requests.service';
import { Ticket } from '../structures/ticket';

@Component({
  selector: 'app-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.css']
})
export class ParkingStatusComponent implements OnChanges {

  @Input() public parkingStatusContentToDisplay: string = "";
  public parkingLotStatus: ParkingLotStatus = new ParkingLotStatus();
  public errorMessageWhenRemovingTicket = "";

  constructor(private requestsService: RequestsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    let inputValue = changes['parkingStatusContentToDisplay'].currentValue;
    if(inputValue === "tickets") {
      this.onDisplayTickets();
    } else if (inputValue === "parkingSpots") {
      this.onDisplayParkingSpots();
    }
  }

  onDisplayTickets() {
    this.requestsService.getTickets().subscribe (
      data => {
        this.parkingLotStatus.setTickets(data);
      }
      
    );
  }

  onDisplayParkingSpots() {
    this.requestsService.getParkingSpots().subscribe (
      data => {
        this.parkingLotStatus.setParkingSpots(data);
      }
    );
    
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
