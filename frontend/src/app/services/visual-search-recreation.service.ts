import { Injectable } from '@angular/core';
import { VsRecreationTransferService } from './vs-recreation-transfer.service';
import { VisualItem } from '../models/VisualItem';
import { Observable } from 'rxjs';
import { RecreationVSData } from '../models/RecreationVSData';

@Injectable({
  providedIn: 'root'
})
export class VisualSearchRecreationService {


  constructor(private transferService: VsRecreationTransferService) { }

  virtualSearchIterLayout(items: VisualItem[], iteration:number){
    const sessionId = localStorage.getItem('sessionId');

      if (!sessionId) {
        console.error('[MouseTracker] Nema sessionId u localStorage!');
        return;
      }
       this.transferService.sendVisualItemsData(
        sessionId,
        iteration,
        items,
      ).subscribe({
        next: () => console.log(`Podaci poslati za visual search test rekreaciju, za iteraciju`, iteration),
        error: (err) => console.error('Greška pri slanju:', err)
      });
  }

  
  getVisualSearchIterLayout(sessionId: string, iteration: number): Observable<RecreationVSData> {

    if (!sessionId) {
      throw new Error('Session ID nije pronađen u localStorage!');
    }

    return this.transferService.getVisualItemsData(sessionId, iteration);
  }
}
