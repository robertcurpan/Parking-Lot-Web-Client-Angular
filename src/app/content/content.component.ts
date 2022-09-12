import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Driver } from '../driver';
import { MessagePopupComponent } from '../message-popup/message-popup.component';
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
  successInformation = "";
  errorInformation = "";
  tooExpensiveError = false;

  constructor(private requestsService: RequestsService, private dialog: MatDialog) { }

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
        this.successInformation = "Parking spot (id: " + data.parkingSpot.id + ") successfully allocated!";
        this.dialog.open(MessagePopupComponent, {data: {successStatus: 'Success', infoMessage: this.successInformation}});
      },
      error: (errorMessage) => {
        this.errorInformation = this.setErrorInformation(errorMessage);
        //this.dialog.open(MessagePopupComponent, {data: {successStatus: 'Error', infoMessage: this.errorInformation}});
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
        this.successInformation = "Parking spot (id: " + parkingSpot.id + ") was successfully released!"
        this.dialog.open(MessagePopupComponent, {data: {successStatus: 'Success', infoMessage: this.successInformation}});
      },
      error: (errorMessage) => {
        this.errorInformation = this.setErrorInformation(errorMessage);
        this.dialog.open(MessagePopupComponent, {data: {successStatus: 'Error', infoMessage: this.errorInformation}});
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

  clearTooExpensiveError() {
    this.tooExpensiveError = false;
  }

  setErrorInformation(errorMessage: string) {
    switch(errorMessage) {
      case "notFound": { return "The specified parking spot does not exist!"; }
      case "notAvailable": { return "There is no available parking spot at the moment!"; }
      case "notOccupied": { return "The specified parking spot is not occupied!";  }
      case "tooExpensive": { this.tooExpensiveError = true; return "The vehicle is too expensive! It should be cheaper than 10.000!"; }
      default: { return "Error while processing the request!"; }
    }
  }

}
