import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReadingMouseData } from '../models/ReadingMouseData';

@Injectable({
  providedIn: 'root'
})
export class FlankerTestDataTransferService {
  private apiUrl = 'http://localhost:4000/flanker/sendData';

  constructor(private http: HttpClient) {}

  sendMouseData(iteration: number, isCorrect: boolean, isCongruent:boolean, events: ReadingMouseData[], sessionId: string ): Observable<any> {
    const payload = {
      iteration,
      isCorrect,
      isCongruent,
      events,
      sessionId
    };

    return this.http.post(this.apiUrl, payload);
  }
}


//this.iter, this.isCorrect, this.reactionTime