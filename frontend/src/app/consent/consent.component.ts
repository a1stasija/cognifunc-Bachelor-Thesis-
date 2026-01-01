import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingMouseDataService } from '../services/reading-mouse-data.service';



@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {

  testType: string = '';
  startX: number = 0;
  startY: number = 0;
  serbian: boolean = true;

  constructor(
    private router: Router,
    private mouseTracker: ReadingMouseDataService
  ) { }

  ngOnInit(): void {
    const stored = localStorage.getItem('test');
    this.testType = stored ? JSON.parse(stored) : '';

    const raw = localStorage.getItem('startMousePosition');
    if (raw) {
      const { x, y } = JSON.parse(raw);
      this.startX = x;
      this.startY = y;
      console.log('Početna pozicija miša:', x, y);
    }

    const lang = localStorage.getItem('language');
    if(lang){
      if(lang == 'srp'){
        this.serbian = true;
      }else{
        this.serbian = false;
      }
    }else{
      this.serbian = true;
    }


    this.mouseTracker.clear();          // očisti staro
    this.mouseTracker.startTracking('consent', this.startX, this.startY);  // počni praćenje
  }


  startTest(event: MouseEvent): void {
    this.mouseTracker.stopTracking();
    this.saveMousePosition(event);
    if (this.testType === 'flanker') {
      this.router.navigate(['/flanker']);
    } else if (this.testType === 'visual') {
      this.router.navigate(['/visualSearch']);
    }
  }

  goBack(): void {
    this.mouseTracker.stopTracking();
    localStorage.removeItem('test');
    this.router.navigate(['']);
    localStorage.removeItem('language');
  }

  private saveMousePosition(event: MouseEvent) {
  const mousePosition = {
    x: event.clientX,
    y: event.clientY
  };
  localStorage.setItem('startMousePosition', JSON.stringify(mousePosition));
  console.log('Pozicija miša pri izboru testa:', mousePosition);
}

}

