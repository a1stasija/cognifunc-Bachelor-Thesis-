import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingMouseDataService } from '../services/reading-mouse-data.service';



@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit{

  testType: string = '';
  
  constructor(
    private router: Router,
    private mouseTracker: ReadingMouseDataService
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('test');
    this.testType = stored ? JSON.parse(stored) : '';
  
    this.mouseTracker.clear();          // očisti staro
    this.mouseTracker.startTracking('consent');  // počni praćenje
  }


  startTest(): void {
    this.mouseTracker.stopTracking();
    if (this.testType === 'flanker') {
      this.router.navigate(['/flanker']);
    } else if (this.testType === 'visual') {
      this.router.navigate(['/visualSearch']);
    }
  }

  goBack(): void {
    this.mouseTracker.stopTracking();
    localStorage.removeItem('test');
    this.router.navigate([''])
  }
}

