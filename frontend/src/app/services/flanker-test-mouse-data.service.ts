import { Injectable } from '@angular/core';
import { FlankerTestDataTransferService } from './flanker-test-data-transfer.service';
import { HttpClient } from '@angular/common/http';
import { ReadingMouseData } from '../models/ReadingMouseData';

@Injectable({
  providedIn: 'root'
})
export class FlankerTestMouseDataService {

  private data: ReadingMouseData[] = [];
  private tracking = false;
  private iter = 0;
  private isCorrect = false;
  private reactionTime = 0 ;

  constructor(private transferService: FlankerTestDataTransferService) { }

  private track = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    this.data.push({
      x,
      y,
      stamp: Date.now()
    });

  };

  startTracking(i:number) {
    this.clear();
    if (!this.tracking) {
      document.addEventListener('mousemove', this.track);
      this.tracking = true;
      this.iter = i;
    }
   }
  stopTracking(res : boolean, rt : number) {
    if (this.tracking) {
      document.removeEventListener('mousemove', this.track);
      this.tracking = false;
      const movements = [...this.data]; // kopija da ne gubimo referencu
      const sessionId = localStorage.getItem('sessionId');
      this.isCorrect = res;
      this.reactionTime = rt;

      if (!sessionId) {
        console.error('[MouseTracker] Nema sessionId u localStorage!');
        return;
      }


      this.transferService.sendMouseData(this.iter, this.isCorrect, this.reactionTime, movements, sessionId).subscribe({
        next: () => console.log(`[MouseTracker] Podaci poslati za flanker test, iteraciju: ${this.iter}`),
        error: (err) => console.error('[MouseTracker] Greška pri slanju:', err)
      });

    }
   }
  clear() { 
    this.data = [];
    this.iter = 0;
    this.isCorrect = false;
    this.reactionTime = 0;
    //this.tracking = false;
  }
}
