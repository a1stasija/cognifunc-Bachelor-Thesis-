import { Injectable } from '@angular/core';
import { ReadingMouseData } from '../models/ReadingMouseData';
import { VisualSearchDataTransferService } from './visual-search-data-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class VisualSearchTestMouseDataService {

  private data: ReadingMouseData[] = [];
  private tracking = false;
  private iter = 0;
  private isCorrect = false;
  private reactionTime = 0;
  private isControl = false;

  constructor(private transferService: VisualSearchDataTransferService) { }

  private track = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    this.data.push({
      x,
      y,
      stamp: Date.now()
    });

  };

  startTracking(i: number, c: boolean) {
    this.clear();
    if (!this.tracking) {
      document.addEventListener('mousemove', this.track);
      this.tracking = true;
      this.iter = i;
      this.isControl = c;
    }
  }

  stopTracking(res: boolean, rt: number) {
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

      console.log(`[MouseTracker] Podaci poslati za visualSearch test, iter: ${this.iter}`);
      console.log(`[MouseTracker] Podaci poslati za visualSearch test, isCorrect: ${this.isCorrect}`);
      console.log(`[MouseTracker] Podaci poslati za visualSearch test, isControl: ${this.isControl}`);
      console.log(`[MouseTracker] Podaci poslati za visualSearch test, reactionTime: ${this.reactionTime}`);

      this.transferService.sendMouseData(this.iter,this.isCorrect, this.isControl, this.reactionTime, movements, sessionId).subscribe({
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
    this.isControl = false;
    //this.tracking = false;
  }


}
