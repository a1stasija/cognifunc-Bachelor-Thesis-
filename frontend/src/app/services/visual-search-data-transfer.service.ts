import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReadingMouseData } from '../models/ReadingMouseData';

@Injectable({
  providedIn: 'root'
})
export class VisualSearchDataTransferService {
  private apiUrl = 'http://localhost:4000/visualSearch/sendData';

  constructor(private http: HttpClient) {}

  sendMouseData(iteration: number, isCorrect: boolean,isControl: boolean, events: ReadingMouseData[], sessionId: string ): Observable<any> {
    const payload = {
      iteration,
      isCorrect,
      isControl,
      events,
      sessionId
    };

    return this.http.post(this.apiUrl, payload);
  }
}
