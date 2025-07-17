import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReadingMouseData } from '../models/ReadingMouseData';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReadingDataTransferService {
  private apiUrl = 'http://localhost:4000/reading/sendData';

  constructor(private http: HttpClient) {}

  sendMouseData(testName: string, events: ReadingMouseData[], sessionId: string ): Observable<any> {
    const payload = {
      testName,
      events,
      sessionId
    };

    return this.http.post(this.apiUrl, payload);
  }
}
