import { Injectable } from '@angular/core';
import { FlankerRecreationTransferService } from './flanker-recreation-transfer.service';
import { RecreationFData } from '../models/RecreationFData';
import { Observable } from 'rxjs';
import { ReadingMouseData } from '../models/ReadingMouseData';


@Injectable({
  providedIn: 'root'
})
export class FlankerRecreationService {


  constructor(private transferService: FlankerRecreationTransferService) {}

  sendFlanker(iteration: number, stimulus: string[]){

    const sessionId = localStorage.getItem('sessionId');

      if (!sessionId) {
        console.error('[MouseTracker] Nema sessionId u localStorage!');
        return;
      }
       this.transferService.sendFlankerData(
        sessionId,
        iteration,
        stimulus,
      ).subscribe({
        next: () => console.log(`Podaci poslati za visual search test rekreaciju, za iteraciju`, iteration),
        error: (err) => console.error('Greška pri slanju:', err)
      });
  }

  getFlankerItemsData(sessionId: string, iteration: number): Observable<RecreationFData> {

    if (!sessionId) {
      throw new Error('Session ID nije pronađen u localStorage!');
    }

    return this.transferService.getFlankerItemsData(sessionId, iteration);
  }
}
