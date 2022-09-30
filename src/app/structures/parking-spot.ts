
export class ParkingSpot {
    constructor(
        public id: number,
        public vehicleId: string,
        public spotType: string,
        public electric: boolean,
        public version: number
    ) {}

    static getDummyParkingSpot() {
        return new ParkingSpot(0, "d968d21e-7e79-403e-85df-8704215faab7", "SMALL", true, 123);
    }
}