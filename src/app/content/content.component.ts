import { Component, Input, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { ParkingLotStatus } from '../parking-lot-status';
import { ParkingSpot } from '../parking-spot';
import { RequestsService } from '../requests.service';
import { Ticket } from '../ticket';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input() firstMenuItemContent: boolean = false;

  parkingLotStatus = new ParkingLotStatus();
  vehicleModel = new Vehicle('', new Driver('', undefined), '', undefined, undefined);
  parkingSpotId = null;
  generateParkingTicketInfoMessage = "";
  leaveParkingLotInfoMessage = "";
  particularErrorMessages = {
    notFound: false,
    notOccupied: false,
    notAvailable: false,
    tooExpensive: false,
    notANumber: false,
    generalErrorMessage: ""
  };

  constructor(private requestsService: RequestsService) { }

  ngOnInit(): void {
    this.requestsService.getParkingSpots().subscribe (
      data => this.parkingLotStatus.setParkingSpots(data)
    );

    this.requestsService.getTickets().subscribe (
      data => this.parkingLotStatus.setTickets(data)
    );
  }

  doGenerateParkingTicket() {
    this.requestsService.generateParkingTicket(this.vehicleModel).subscribe ({
      next: (data) => {
        console.log("Success!", data);
        this.updateParkingLotStatusWhenDriverParks(data);
        console.log(this.parkingLotStatus);
        this.generateParkingTicketInfoMessage = "Parking spot (id: " + data.parkingSpot.id + ") successfully allocated!";
        this.leaveParkingLotInfoMessage = "";
      },
      error: (errorMessage) => {
        this.setErrorInParticularErrorMessages(errorMessage);
      }
    });
  }

  doLeaveParkingLot() {
    let parkingSpot: ParkingSpot = ParkingSpot.getDummyParkingSpot();
    for(let currentParkingSpot of this.parkingLotStatus.parkingSpots) {
      if(currentParkingSpot.id == this.parkingSpotId) {
        parkingSpot = currentParkingSpot;
        break;
      }
    }

    this.requestsService.leaveParkingLot(parkingSpot).subscribe({
      next: (data) => {
        console.log("Success!", data);
        this.updateParkingLotStatusWhenDriverLeaves(data);
        console.log(this.parkingLotStatus);
        this.leaveParkingLotInfoMessage = "Parking spot (id: " + parkingSpot.id + ") was successfully released!"
        this.generateParkingTicketInfoMessage = "";
      },
      error: (errorMessage) => {
        this.setErrorInParticularErrorMessages(errorMessage);
      }
    });

  }


  arrayRemoveTicket(arr: Array<Ticket>, ticket: Ticket) {
    return arr.filter(function(currentTicket) {
        return currentTicket.parkingSpot.id != ticket.parkingSpot.id;
    });
  }

  updateParkingLotStatusWhenDriverParks(ticket: Ticket) {
    // Vom updata parkingLotStatus (Adaugam ticket-ul in lista de tickets si modificam vehicleId + version in parkingSpots)
    this.parkingLotStatus.tickets.push(ticket);
    this.updateParkingSpotInParkingLotStatus(ticket.parkingSpot);
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

  setErrorInParticularErrorMessages(errorMessage: string) {
    this.resetParticularErrorMessages();
    switch(errorMessage) {
      case "notFound": { this.particularErrorMessages.notFound = true; break; }
      case "notAvailable": { this.particularErrorMessages.notAvailable = true; break; }
      case "notOccupied": { this.particularErrorMessages.notOccupied = true; break; }
      case "tooExpensive": { this.particularErrorMessages.tooExpensive = true; break; }
      case "notANumber": { this.particularErrorMessages.notANumber = true; break; }
      default: { this.particularErrorMessages.generalErrorMessage = errorMessage; break; }
    }
  }

  resetParticularErrorMessages() {
    this.particularErrorMessages = {
      notFound: false,
      notOccupied: false,
      notAvailable: false,
      tooExpensive: false,
      notANumber: false,
      generalErrorMessage: ""
    };
  }

  resetInfoMessages() {
    this.generateParkingTicketInfoMessage = "";
    this.leaveParkingLotInfoMessage = "";
  }

  resetInfoAndErrorMessages() {
    this.resetParticularErrorMessages();
    this.resetInfoMessages();
  }

}
