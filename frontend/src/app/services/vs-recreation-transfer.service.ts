import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VisualItem } from '../models/VisualItem';
import { Observable } from 'rxjs/internal/Observable';
import { RecreationVSData } from '../models/RecreationVSData';

@Injectable({
  providedIn: 'root'
})
export class VsRecreationTransferService {
  private apiUrl = 'http://localhost:4000/recreateVS';

  constructor(private http: HttpClient) { }

  sendVisualItemsData(sessionId: string, iteration: number, items: VisualItem[]): Observable<any> {
    const payload = {
      sessionId,
      iteration,
      items
    };

    return this.http.post(`${this.apiUrl}/sendData`, payload);
  }

  getVisualItemsData(sessionId: string, iteration: number): Observable<RecreationVSData> {
    const payload = {
      sessionId,
      iteration
    };

    return this.http.post<RecreationVSData>(`${this.apiUrl}/getData`, payload);
  }
}
