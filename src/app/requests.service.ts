import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from './vehicle';
import { ParkingSpot } from './parking-spot';
import { Ticket } from './ticket';
import { catchError, Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private jwt = "";

  constructor(private http: HttpClient) { }

  generateParkingTicket(vehicle: Vehicle): Observable<Ticket> {
    let generateParkingTicketURL = "http://localhost:8080/generateParkingTicket";
    return this.http.post<Ticket>(generateParkingTicketURL, vehicle, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt }) })
                      .pipe(catchError(this.handleError));
  }

  leaveParkingLot(parkingSpot: ParkingSpot): Observable<Ticket> {
    let leaveParkingLotURL = "http://localhost:8080/leaveParkingLot";
    return this.http.post<Ticket>(leaveParkingLotURL, parkingSpot, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt }) })
                      .pipe(catchError(this.handleError));
  }

  getParkingSpots(): Observable<ParkingSpot[]> {
    let getParkingSpotsURL = "http://localhost:8080/getParkingSpots";
    return this.http.get<ParkingSpot[]>(getParkingSpotsURL, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt }) });
  }

  getTickets(): Observable<Ticket[]> {
    let getTicketsURL = "http://localhost:8080/getTickets";
    return this.http.get<Ticket[]>(getTicketsURL, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt }) });
  }

  login(username: string, password: string): Observable<any> {
    let loginURL = "http://localhost:8080/login";
    let userInfo = { username: username, password: password };
    return this.http.post<any>(loginURL, userInfo)
                      .pipe(catchError(this.handleError));
  }

  handleError(response: any) {
    let errorMessage = response.error.message;
    return throwError(() => errorMessage);
  }

  setJwtForAuthorization(jwt: string) {
    this.jwt = jwt;
  }

  clearJwt() {
    this.jwt = "";
  }

}
