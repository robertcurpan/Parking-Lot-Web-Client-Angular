import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private subject = new Subject<string>();

  sendRequestCommand(requestCommandType: string) {
    this.subject.next(requestCommandType);
  }

  getRequestCommand(): Observable<string> {
    return this.subject.asObservable();
  }
}
