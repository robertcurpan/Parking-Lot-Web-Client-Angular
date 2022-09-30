import { ParkingSpot } from "./parking-spot";
import { Ticket } from "./ticket";

export class ParkingLotStatus {
    parkingSpots: Array<ParkingSpot> = new Array();
    tickets: Array<Ticket> = new Array();

    constructor() {}

    setParkingSpots(parkingSpots: Array<ParkingSpot>) {
        this.parkingSpots = parkingSpots;
    }

    setTickets(tickets: Array<Ticket>) {
        this.tickets = tickets;
    }

    
}
