import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from './vehicle';
import { ParkingSpot } from './parking-spot';
import { Ticket } from './ticket';
import { catchError, Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  generateParkingTicket(vehicle: Vehicle): Observable<Ticket> {
    let generateParkingTicketURL = "http://localhost:8080/generateParkingTicket";
    return this.http.post<Ticket>(generateParkingTicketURL, vehicle)
                      .pipe(catchError(this.handleError));
  }

  leaveParkingLot(parkingSpot: ParkingSpot): Observable<Ticket> {
    let leaveParkingLotURL = "http://localhost:8080/leaveParkingLot";
    return this.http.post<Ticket>(leaveParkingLotURL, parkingSpot)
                      .pipe(catchError(this.handleError));
  }

  getParkingSpots(): Observable<ParkingSpot[]> {
    let getParkingSpotsURL = "http://localhost:8080/getParkingSpots";
    return this.http.get<ParkingSpot[]>(getParkingSpotsURL);
  }

  getTickets(): Observable<Ticket[]> {
    let getTicketsURL = "http://localhost:8080/getTickets";
    return this.http.get<Ticket[]>(getTicketsURL);
  }

  handleError(response: any) {
    let errorMessage = response.error.message;
    return throwError(() => errorMessage);
  }

  

}
