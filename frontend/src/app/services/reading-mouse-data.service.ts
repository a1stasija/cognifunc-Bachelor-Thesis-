import { Injectable } from '@angular/core';
import { ReadingMouseData } from '../models/ReadingMouseData';
import { HttpClient } from '@angular/common/http';
import { ReadingDataTransferService } from './reading-data-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class ReadingMouseDataService {

  private data: ReadingMouseData[] = [];
  private tracking = false;
  private case = '';

  constructor(private transferService: ReadingDataTransferService) { }

  private track = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    this.data.push({
      x,
      y,
      stamp: Date.now()
    });

  };

  startTracking(t: string) {
    if (!this.tracking) {
      document.addEventListener('mousemove', this.track);
      this.tracking = true;
      this.case = t;
    }
  }

  stopTracking() {
    if (this.tracking) {
      document.removeEventListener('mousemove', this.track);
      this.tracking = false;
      const movements = [...this.data]; // kopija da ne gubimo referencu
      const sessionId = localStorage.getItem('sessionId');

      if (!sessionId) {
        console.error('[MouseTracker] Nema sessionId u localStorage!');
        return;
      }


      this.transferService.sendMouseData(this.case, movements, sessionId).subscribe({
        next: () => console.log(`[MouseTracker] Podaci poslati za test: ${this.case}`),
        error: (err) => console.error('[MouseTracker] Greška pri slanju:', err)
      });

      this.case = '';

    }
  }

  getData(): ReadingMouseData[] {
    return this.data;
  }

  clear() {
    this.data = [];
    //this.tracking = false;
  }

}
