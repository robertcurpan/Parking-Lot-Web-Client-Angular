import { Driver } from "./driver";

export class Vehicle {
    constructor(
        public vehicleType: string,
        public driver: Driver,
        public color: string,
        public price?: number,
        public electric?: boolean
    ) {}
}
