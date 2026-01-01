import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingMouseDataService } from '../services/reading-mouse-data.service';
import { FlankerTestMouseDataService } from '../services/flanker-test-mouse-data.service';
import { FlankerRecreationService } from '../services/flanker-recreation.service';


interface Trial {
  congruent: boolean;
  direction: 'left' | 'right';
}

@Component({
  selector: 'app-flanker-test',
  templateUrl: './flanker-test.component.html',
  styleUrls: ['./flanker-test.component.css']
})
export class FlankerTestComponent implements OnInit {
  showInstructions: boolean = false;
  trialIndex: number = 1;
  stimulus: string[] = [];
  stimulusShownAt: number = 0;
  correctAnswer: string = 'left';
  testEnded: boolean = false;
  isCongruent: boolean = false;
  startX: number = 0;
  startY: number = 0;
  serbian: boolean = true;

// ZA DIPLOMSKI PROMENI STIMULUSE I IF TRIALINDEX == 112 SA 112 NA 60

/*private predefinedTrials: Trial[] = [
  // BLOCK 1 (20)
  // A B C D
  { congruent: true,  direction: 'left'  }, // A
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'left'  }, // C
  { congruent: false, direction: 'right' }, // D
  // B C D A
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'left'  }, // C
  { congruent: false, direction: 'right' }, // D
  { congruent: true,  direction: 'left'  }, // A
  // C D A B
  { congruent: false, direction: 'left'  }, // C
  { congruent: false, direction: 'right' }, // D
  { congruent: true,  direction: 'left'  }, // A
  { congruent: true,  direction: 'right' }, // B
  // D A B C
  { congruent: false, direction: 'right' }, // D
  { congruent: true,  direction: 'left'  }, // A
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'left'  }, // C
  // A C B D
  { congruent: true,  direction: 'left'  }, // A
  { congruent: false, direction: 'left'  }, // C
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'right' }, // D

  // BLOCK 2 (20)
  // C A D B
  { congruent: false, direction: 'left'  }, // C
  { congruent: true,  direction: 'left'  }, // A
  { congruent: false, direction: 'right' }, // D
  { congruent: true,  direction: 'right' }, // B
  // A D B C
  { congruent: true,  direction: 'left'  }, // A
  { congruent: false, direction: 'right' }, // D
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'left'  }, // C
  // D B C A
  { congruent: false, direction: 'right' }, // D
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'left'  }, // C
  { congruent: true,  direction: 'left'  }, // A
  // B C A D
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'left'  }, // C
  { congruent: true,  direction: 'left'  }, // A
  { congruent: false, direction: 'right' }, // D
  // C B A D  (mala varijacija radi anti-predvidljivosti)
  { congruent: false, direction: 'left'  }, // C
  { congruent: true,  direction: 'right' }, // B
  { congruent: true,  direction: 'left'  }, // A
  { congruent: false, direction: 'right' }, // D

  // BLOCK 3 (20)
  // B D A C
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'right' }, // D
  { congruent: true,  direction: 'left'  }, // A
  { congruent: false, direction: 'left'  }, // C
  // D A C B
  { congruent: false, direction: 'right' }, // D
  { congruent: true,  direction: 'left'  }, // A
  { congruent: false, direction: 'left'  }, // C
  { congruent: true,  direction: 'right' }, // B
  // A C B D
  { congruent: true,  direction: 'left'  }, // A
  { congruent: false, direction: 'left'  }, // C
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'right' }, // D
  // C B D A
  { congruent: false, direction: 'left'  }, // C
  { congruent: true,  direction: 'right' }, // B
  { congruent: false, direction: 'right' }, // D
  { congruent: true,  direction: 'left'  }, // A
  // D C A B  (druga varijacija)
  { congruent: false, direction: 'right' }, // D
  { congruent: false, direction: 'left'  }, // C
  { congruent: true,  direction: 'left'  }, // A
  { congruent: true,  direction: 'right' }  // B
];*/

private predefinedTrials: Trial[] = [
  // --- Superblock 1: order [1, 2, 3, 4] ---
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B

  // --- Superblock 2: order [2, 3, 4, 1] ---
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C

  // --- Superblock 3: order [3, 4, 1, 2] ---
  { congruent: false, direction: 'right' }, // C
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D

  // --- Superblock 4: order [4, 1, 2, 3] ---
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A

  // --- Superblock 5: order [1, 3, 2, 4] ---
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C
  { congruent: false, direction: 'right' }, // C
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B

  // --- Superblock 6: order [2, 4, 3, 1] ---
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'right' }, // C
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C

  // --- Superblock 7: order [3, 1, 4, 2] ---
  { congruent: false, direction: 'right' }, // C
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'right' }, // A
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'left' }, // D
  { congruent: false, direction: 'right' }, // C
  { congruent: false, direction: 'left' }, // D
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'left' }, // B
  { congruent: true, direction: 'left' }, // B
  { congruent: false, direction: 'right' }, // C
  { congruent: true, direction: 'right' }, // A
  { congruent: false, direction: 'left' }, // D

];

  constructor(private router: Router, private readingMouseTracker: ReadingMouseDataService, private testMouseTracker: FlankerTestMouseDataService, private recreationService: FlankerRecreationService) { }

  ngOnInit(): void {
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


    this.showInstructions = true;
    this.trialIndex = 1;
    this.stimulus = [];
    this.stimulusShownAt = 0;
    this.correctAnswer = 'left';
    this.testEnded = false;
    this.isCongruent = false;
    this.readingMouseTracker.startTracking('flankerInstructions', this.startX, this.startY)
  }

  startTest(event: MouseEvent): void {
    this.showInstructions = false;
    this.readingMouseTracker.stopTracking();
    this.saveMousePosition(event);
    this.generateTrial();
  }

  generateTrial(): void {
     // uzimamo iteraciju iz niza na osnovu trialIndex
  const trial = this.predefinedTrials[this.trialIndex-1];

  const congruent = trial.congruent;
  const direction = trial.direction;

  let target = direction;
  let flank = direction;

  if (!congruent) {
    target = direction === 'left' ? 'right' : 'left';
  }

  this.stimulus = [flank, flank, flank, target, flank, flank, flank];
  this.correctAnswer = target;
  this.isCongruent = congruent;
  this.stimulusShownAt = Date.now();
  this.testMouseTracker.startTracking(this.trialIndex, this.startX, this.startY);

    /*const congruent = Math.random() > 0.5;
    const direction = Math.random() > 0.5 ? 'left' : 'right';

    let target = direction;
    let flank = direction;

    if (!congruent) {
      target = direction === 'left' ? 'right' : 'left';
    }

    this.stimulus = [flank, flank, flank, target, flank, flank,flank];
    this.correctAnswer = target;
    this.isCongruent = congruent;
    this.stimulusShownAt = Date.now();
    this.testMouseTracker.startTracking(this.trialIndex, this.startX, this.startY);

    this.recreationService.sendFlanker(this.trialIndex, this.stimulus);*/
  }


  answer(direction: 'left' | 'right') {
    const isCorrect = direction === this.correctAnswer;
    this.testMouseTracker.stopTracking(isCorrect, this.isCongruent);

    if (this.trialIndex == 112) {
      this.testEnded = true;
      const raw = localStorage.getItem('startMousePosition');
      if (raw) {
      const { x, y } = JSON.parse(raw);
      this.startX = x;
      this.startY = y;
      console.log('Krajnja pozicija miša:', x, y);
    }
    this.readingMouseTracker.startTracking('flankerEnd', this.startX, this.startY)
      return;
    }else{
      this.trialIndex++;
      this.generateTrial();
    }

  }

  goBack() {
    localStorage.removeItem('test');
    this.readingMouseTracker.stopTracking();
    this.router.navigate(['/']);
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
