import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingMouseDataService } from '../services/reading-mouse-data.service';
import { VisualSearchTestMouseDataService } from '../services/visual-search-test-mouse-data.service';
import { VisualItem } from '../models/VisualItem';

@Component({
  selector: 'app-visual-search-test',
  templateUrl: './visual-search-test.component.html',
  styleUrls: ['./visual-search-test.component.css']
})
export class VisualSearchTestComponent implements OnInit {
  showInstructions: boolean = false;
  trialIndex: number = 1;
  testEnded: boolean = false;
  items: VisualItem[] = [];
  gridSize = 5; // 5x5 grid
  noTargetIndex = 0;
  noTarget = false;
  reactionTime: number = 0;
  stimulusShownAt: number = 0;

  constructor(private router: Router, private readingMouseTracker: ReadingMouseDataService, private testMouseTracker: VisualSearchTestMouseDataService) { }

  ngOnInit(): void {
    this.showInstructions = true;
    if (!this.testEnded) {
      this.readingMouseTracker.startTracking('visualSearchInstructions')
    }
  }

  startTest() {
    this.showInstructions = false;
    this.readingMouseTracker.stopTracking();
    this.generateTrial();
  }


  generateTrial() {
    this.items = [];

    const total = this.gridSize * this.gridSize;
    for (let i = 0; i < total; i++) {
      const item = new VisualItem();
      item.x = (i % this.gridSize) * 100;
      item.y = Math.floor(i / this.gridSize) * 100;
      if (this.trialIndex < 5) {
        item.isVisible = Math.random() < 0.5 ? false : true;
      } else if (this.trialIndex < 10) {
        item.isVisible = Math.random() < 0.3 ? false : true;
      } else {
        item.isVisible = Math.random() < 0.2 ? false : true;
      }
      if (this.trialIndex < 10) {
        item.color = Math.random() < 0.5 ? 'red' : 'blue';
      } else {
        item.color = Math.random() < 0.75 ? 'red' : 'blue';
      }
      if (item.color == 'red') {
        if (this.trialIndex < 10) {
          item.orientation = 'rotated';
        } else {
          let o = Math.random() < 0.5 ? 'rotated' : 'semi';
          if (o === 'semi') {
            o = Math.random() < 0.5 ? 'semi-rotated-left' : 'semi-rotated-right';
          }
          item.orientation = o;
        }
      } else {
        item.orientation = 'normal';
      }
      this.items.push(item);
    }
    if (this.noTargetIndex < 5) {
      this.noTarget = Math.random() < 0.7 ? false : true;
    }
    if (this.noTarget == true) {
      this.noTargetIndex++;
    } else {
      let targetIndex = Math.floor(Math.random() * total)
      this.items[targetIndex].isVisible = true;
      this.items[targetIndex].color = 'red';
      this.items[targetIndex].orientation = 'normal';
      this.items[targetIndex].isTarget = true;
    }
    this.stimulusShownAt = Date.now();
    this.testMouseTracker.startTracking(this.trialIndex, this.noTarget);

  }
  handleClick(item: VisualItem) {
    const isCorrect = item.isTarget;
    //alert(isCorrect ? 'Tačno!' : 'Netačno!');
    const responseGivenAt = Date.now();
    this.reactionTime = responseGivenAt - this.stimulusShownAt;

    if (this.trialIndex == 30) {
      this.testEnded = true;
    } else {
      this.noTarget = false;
      this.trialIndex++;
    }

    this.testMouseTracker.stopTracking(isCorrect, this.reactionTime);
    this.generateTrial();

  }

  handleRightClick(event: MouseEvent): void {
    event.preventDefault(); // sprečava otvaranje kontekst menija
    //event.stopPropagation(); // opciono – da ne propagira dalje

    const hasTarget = this.items.some(item => item.isTarget && item.isVisible);
    const responseGivenAt = Date.now();
    this.reactionTime = responseGivenAt - this.stimulusShownAt;

    if (!hasTarget) {
      //alert('Tačno: meta nije prisutna.');
      this.testMouseTracker.stopTracking(true, this.reactionTime);
    } else {
      //alert('Netačno: meta je bila prisutna.');
      this.testMouseTracker.stopTracking(false, this.reactionTime);
    }
    if (this.trialIndex == 30) {
      this.testEnded = true;
    } else {
      this.noTarget = false;
      this.trialIndex++;
      this.generateTrial();
    }
  }


  getImagePath(item: VisualItem): string {
    if (item.color === 'red' && item.orientation === 'normal') return 'assets/red_normal_T.png';
    if (item.color === 'red' && item.orientation === 'rotated') return 'assets/red_rotated_T.png';
    if (item.color === 'red' && item.orientation === 'semi-rotated-left') return 'assets/red_semirotatedL_T.png';
    if (item.color === 'red' && item.orientation === 'semi-rotated-right') return 'assets/red_semirotatedR_T.png';
    if (item.color === 'blue' && item.orientation === 'normal') return 'assets/blue_normal_T.png';
    return 'assets/blue_T_rotated.png';
  }

}
