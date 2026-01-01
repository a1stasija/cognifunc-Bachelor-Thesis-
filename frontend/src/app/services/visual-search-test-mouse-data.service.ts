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
  private isControl = false;

  private mouseX: number = 0;
  private mouseY: number = 0;
  private intervalId: any = null;
  private stamp: number = 0;

  constructor(private transferService: VisualSearchDataTransferService) {}

  private pointerHandler = (e: PointerEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.stamp = e.timeStamp;
  };

  startTracking(i: number, c: boolean, startX: number, startY: number) {
    this.clear();

    this.mouseX = startX;
    this.mouseY = startY;

    if (!this.tracking) {
      this.tracking = true;
      this.iter = i;
      this.isControl = c;

      // Prati poziciju pokazivača
      document.addEventListener('pointermove', this.pointerHandler, { passive: true });

      // Snima poziciju svakih 10ms tj 100Hz
      this.intervalId = setInterval(() => {
        this.data.push({
          x: this.mouseX,
          y: this.mouseY,
          stamp: performance.now()
        });
      }, 10);
    }
  }

  stopTracking(res: boolean, rt: number) {
    if (this.tracking) {
      this.tracking = false;

      document.removeEventListener('pointermove', this.pointerHandler);
      clearInterval(this.intervalId);
      this.intervalId = null;

      const movements = [...this.data];
      const sessionId = localStorage.getItem('sessionId');
      this.isCorrect = res;

      if (!sessionId) {
        console.error('[MouseTracker] Nema sessionId u localStorage!');
        return;
      }

      this.transferService.sendMouseData(
        this.iter,
        this.isCorrect,
        this.isControl,
        movements,
        sessionId
      ).subscribe({
        next: () => console.log(`[MouseTracker] Podaci poslati za visual search test, iteracija: ${this.iter}`),
        error: (err) => console.error('[MouseTracker] Greška pri slanju:', err)
      });
    }
  }

  clear() {
    this.data = [];
    this.iter = 0;
    this.isCorrect = false;
    this.isControl = false;
  }
}
