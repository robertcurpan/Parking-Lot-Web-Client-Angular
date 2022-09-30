import { ParkingSpot } from "./parking-spot";
import { Vehicle } from "./vehicle";

export class Ticket {
    constructor(
        public ticketId: string,
        public parkingSpot: ParkingSpot,
        public vehicle: Vehicle,
        public date: String
    ) {}
}