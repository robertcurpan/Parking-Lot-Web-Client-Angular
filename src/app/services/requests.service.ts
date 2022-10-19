import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../structures/vehicle';
import { ParkingSpot } from '../structures/parking-spot';
import { Ticket } from '../structures/ticket';
import { catchError, Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private jwt = "";
  private serverIP = "52.50.172.119";

  constructor(private http: HttpClient) { }

  generateParkingTicket(vehicle: Vehicle): Observable<Ticket> {
    let generateParkingTicketURL = "http://" + this.serverIP + ":8080/generateParkingTicket";
    return this.http.post<Ticket>(generateParkingTicketURL, vehicle, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt }) })
                      .pipe(catchError(this.handleError));
  }

  leaveParkingLot(parkingSpot: ParkingSpot): Observable<Ticket> {
    let leaveParkingLotURL = "http://" + this.serverIP + ":8080/leaveParkingLot";
    return this.http.post<Ticket>(leaveParkingLotURL, parkingSpot, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt }) })
                      .pipe(catchError(this.handleError));
  }

  getParkingSpots(): Observable<ParkingSpot[]> {
    let getParkingSpotsURL = "http://" + this.serverIP + ":8080/getParkingSpots";
    return this.http.get<ParkingSpot[]>(getParkingSpotsURL, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt }) });
  }

  getTickets(): Observable<Ticket[]> {
    let getTicketsURL = "http://" + this.serverIP + ":8080/getTickets";
    return this.http.get<Ticket[]>(getTicketsURL, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt }) });
  }

  login(username: string, password: string): Observable<any> {
    let loginURL = "http://" + this.serverIP + ":8080/login";
    let userInfo = { username: username, password: password };
    return this.http.post<any>(loginURL, userInfo)
                      .pipe(catchError(this.handleError));
  }

  registerVipUser(username: string, password: string): Observable<any> {
    let registerURL = "http://" + this.serverIP + ":8080/register";
    let userInfo = { username: username, password: password };
    return this.http.post<any>(registerURL, userInfo, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt }) })
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
