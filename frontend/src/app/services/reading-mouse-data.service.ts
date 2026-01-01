import { Injectable } from '@angular/core';
import { ReadingMouseData } from '../models/ReadingMouseData';
import { ReadingDataTransferService } from './reading-data-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class ReadingMouseDataService {

  private data: ReadingMouseData[] = [];
  private tracking = false;
  private case = '';

  private mouseX: number = 0;
  private mouseY: number = 0;
  private intervalId: any = null;

  constructor(private transferService: ReadingDataTransferService) { }

  private pointerHandler = (e: PointerEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  startTracking(t: string, startX: number, startY: number) {
    if (!this.tracking) {
      this.clear();
      this.tracking = true;
      this.case = t;
      this.mouseX = startX;
      this.mouseY = startY;

      // Praćenje pozicije miša
      document.addEventListener('pointermove', this.pointerHandler, { passive: true });

      // Uzorkovanje svakih 10ms
      this.intervalId = setInterval(() => {
          this.data.push({
            x: this.mouseX,
            y: this.mouseY,
            stamp: performance.now()
          });
      }, 10);
    }
  }

  stopTracking() {
    if (this.tracking) {
      this.tracking = false;

      document.removeEventListener('pointermove', this.pointerHandler);
      clearInterval(this.intervalId);
      this.intervalId = null;

      const movements = [...this.data];
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
    this.case = '';
  }
}
