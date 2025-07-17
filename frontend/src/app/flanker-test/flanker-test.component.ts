import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingMouseDataService } from '../services/reading-mouse-data.service';
import { FlankerTestMouseDataService } from '../services/flanker-test-mouse-data.service';

@Component({
  selector: 'app-flanker-test',
  templateUrl: './flanker-test.component.html',
  styleUrls: ['./flanker-test.component.css']
})
export class FlankerTestComponent implements OnInit{
  showInstructions: boolean = false;
  trialIndex: number = 1;
  stimulus: string[] = [];
  stimulusShownAt: number = 0;
  correctAnswer: 'left' | 'right' = 'left';
  testEnded: boolean = false;
  reactionTime: number = 0;

  constructor( private router: Router, private readingMouseTracker: ReadingMouseDataService, private testMouseTracker: FlankerTestMouseDataService){}

  ngOnInit(): void {
    this.showInstructions = true;
    this.readingMouseTracker.startTracking('flankerInstructions')
  }

  startTest(): void {
    this.showInstructions = false;
    this.readingMouseTracker.stopTracking();
    this.generateTrial();
  }

  generateTrial(): void {
    const congruent = Math.random() > 0.5;
    const direction = Math.random() > 0.5 ? 'left' : 'right';
    const flank = direction === 'left' ? 'left;' : 'right';
    let target = direction === 'left' ? 'left' : 'right';

    if (!congruent) {
      target = direction === 'left' ? 'right' : 'left';
    }
    this.stimulus = [flank, flank, target, flank, flank];
    this.correctAnswer = target === 'left' ? 'left' : 'right';
    this.stimulusShownAt = Date.now();
    this.testMouseTracker.startTracking(this.trialIndex);
  }

  answer(direction: 'left' | 'right') {
    const responseGivenAt = Date.now();
    this.reactionTime = responseGivenAt - this.stimulusShownAt;
    const isCorrect = direction === this.correctAnswer;

    if (this.trialIndex == 3) {
      this.testEnded = true;
    }

    this.testMouseTracker.stopTracking(isCorrect, this.reactionTime);

    this.trialIndex++;
    this.generateTrial();

  }

  goBack() {
    localStorage.removeItem('test');
    this.router.navigate(['/']);
  }
}
