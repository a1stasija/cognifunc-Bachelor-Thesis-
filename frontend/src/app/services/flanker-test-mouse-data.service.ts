import { Injectable } from '@angular/core';
import { FlankerTestDataTransferService } from './flanker-test-data-transfer.service';
import { ReadingMouseData } from '../models/ReadingMouseData';

@Injectable({
  providedIn: 'root'
})
export class FlankerTestMouseDataService {

  private data: ReadingMouseData[] = [];
  private tracking = false;
  private iter = 0;
  private isCorrect = false;
  private isCongruent = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private intervalId: any = null;

  constructor(private transferService: FlankerTestDataTransferService) {}

  private pointerHandler = (e: PointerEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  clear() {
    this.data = [];
    this.iter = 0;
    this.isCorrect = false;
    this.isCongruent = false;
  }

  startTracking(i: number, startX: number, startY: number) {
    this.clear();

    this.mouseX = startX;
    this.mouseY = startY;

    if (!this.tracking) {
      this.tracking = true;
      this.iter = i;

      // Praćenje pozicije pokazivača
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
  

  stopTracking(res: boolean, cong: boolean) {
    if (this.tracking) {
      this.tracking = false;

      document.removeEventListener('pointermove', this.pointerHandler);
      clearInterval(this.intervalId);
      this.intervalId = null;

      const movements = [...this.data];
      const sessionId = localStorage.getItem('sessionId');
      this.isCorrect = res;
      this.isCongruent = cong;

      if (!sessionId) {
        console.error('Nema sessionId u localStorage!');
        return;
      }

      this.transferService.sendMouseData(
        this.iter,
        this.isCorrect,
        this.isCongruent,
        movements,
        sessionId
      ).subscribe({
        next: () => console.log(`Podaci poslati za flanker test, iteraciju: ${this.iter}`),
        error: (err) => console.error('Greška pri slanju:', err)
      });
    }
  }

}
