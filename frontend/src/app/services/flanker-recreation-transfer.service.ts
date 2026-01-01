import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecreationFData } from '../models/RecreationFData';

@Injectable({
  providedIn: 'root'
})
export class FlankerRecreationTransferService {
  private apiUrl = 'http://localhost:4000/recreateFlanker';

  constructor(private http: HttpClient) { }
  
    sendFlankerData(sessionId: string, iteration: number, stimulus: string[]): Observable<any> {
      const payload = {
        sessionId,
        iteration,
        stimulus
      };
  
      return this.http.post(`${this.apiUrl}/sendData`, payload);
    }
  
    
  getFlankerItemsData(sessionId: string, iteration: number): Observable<RecreationFData> {
    const payload = {
      sessionId,
      iteration
    };

    return this.http.post<RecreationFData>(`${this.apiUrl}/getData`, payload);
  }
}
