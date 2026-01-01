import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingMouseDataService } from '../services/reading-mouse-data.service';
import { VisualSearchTestMouseDataService } from '../services/visual-search-test-mouse-data.service';
import { VisualItem } from '../models/VisualItem';
import { VisualSearchRecreationService } from '../services/visual-search-recreation.service';

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
  gridSize = 5; // 5x5 grid VRATI, VIDI GDE SE KORISTI 6 I ZAMENI SA 5
  noTargetIndex = 0;
  noTarget = false;
  reactionTime: number = 0;
  stimulusShownAt: number = 0;
  startX: number = 0;
  startY: number = 0;
  serbian: boolean = true;
/*private predefinedMaps: string[][] = [
  // 1
  [
    '...RR',
    'RBRBR',
    'R.R.B',
    '.BBRR',
    'R.RBB'
  ],
  // 2 
  [
    'R.BBB',
    'RBRB.',
    'BB..R',
    'BRRRB',
    'R.TRR'
  ],
  // 3
  [
    '.BRBB',
    '.R.BB',
    'BTR.R',
    'BRRR.',
    '..BB.'
  ],
  // 4
  [
    '..B.B',
    '..RR.',
    '.BBTR',
    'RBRRR',
    'BR.R.'
  ],
  // 5
  [
    'B.RBR',
    '.RBRT',
    'RRRRR',
    'RRRB.',
    '.R.BB'
  ],
  // 6
  [
    'B.RRR',
    'BBRBB',
    '..BRT',
    'BBB.R',
    '.BBRB'
  ],
  // 7
  [
    '.BB..',
    'BBRR.',
    'BRBBR',
    'TRB.B',
    'RBR.R'
  ],
  // 8
  [
    'BB.RB',
    '.R.BR',
    'BBRBR',
    '.R..B',
    'RRR.R'
  ],
  // 9
  [
    'BBBR.',
    'BRBRR',
    'TS.RB',
    'RRB.B',
    '.BBR.'
  ],
  // 10
  [
    'R.RRR',
    'LRRB.',
    'SBBRR',
    'S.SBL',
    'BRRSS'
  ],
  // 11
  [
    'LRL..',
    'LR.BL',
    'BRS.B',
    'RRLRL',
    'S...R'
  ],
  // 12
  [
    'BLRRB',
    'B.TRS',
    'BR..L',
    '.LRBS',
    'SL.R.'
  ],
  // 13
  [
    'RRRSS',
    'LRRSR',
    '.LBR.',
    'BTRLB',
    'LBR.B'
  ],
  // 14
  [
    'SS.LS',
    '.LRRR',
    'BLSLR',
    'LB.RL',
    'RBSBL'
  ],
  // 15
  [
    'RL.SR',
    'RBBLR',
    'LBLSR',
    '.LTRS',
    'BSRBR'
  ],
  // 16
  [
    'LRSSR',
    'LSR.B',
    'SSRBB',
    'SRRLT',
    '.RRBR'
  ],
  // 17
  [
    'SRTSR',
    '.RRLL',
    'BSLSL',
    'BR..R',
    'BLLRR'
  ],
  // 18
  [
    '.B.LB',
    'SBRSR',
    'LT.BR',
    'SR.SL',
    '.SLRR'
  ],
   // 19
  [
    'LLBBS',
    '..RRL',
    'R.RRS',
    'R.RTR',
    'RBLSB'
  ],
  // 20
  [
    '.S.LR',
    'SBBLL',
    'RR.RT',
    'LS..R',
    'BBR.S'
  ],
  // 21
  [
    'SSBSR',
    'TLRRS',
    'SLL.R',
    'RSRRB',
    'RRB.R'
  ],
  // 22
  [
    'LSS.R',
    '.STBL',
    'S.RRS',
    'BBRBR',
    '..RB.'
  ],
  // 23
  [
    'RBLRS',
    'RRLRR',
    'LRBRL',
    'ST.BR',
    'RRSBR'
  ],
  // 24
  [
    'BRLLR',
    'L.RRL',
    'SRSTR',
    'S.SLB',
    'B..SL'
  ],
  // 25
  [
    '.SB.B',
    'SSBRL',
    'TBBRL',
    'SLB.B',
    'SR.RR'
  ],
  // 26
  [
    '.LRRR',
    '..STL',
    'BRRBR',
    'SLRRL',
    'LLRRL'
  ],
  // 27
  [
    'RB.BR',
    '.RL.R',
    'BRLBB',
    'LRRRL',
    'TLSBR'
  ],
  // 28
  [
    'RLSLR',
    'SSRLL',
    'SBLSR',
    'BLRRT',
    'BSSRL'
  ],  
  // 29
  [
    'SR.SL',
    'SRSRL',
    'LSRLR',
    '.SRSR',
    'RSLRT'
  ],
  // 30
  [
    'RLSSR',
    'LLRTS',
    'LRSLR',
    'RSSRS',
    'RRSLS'
  ]
];*/

private predefinedMaps: string[][] = [
 // 1
  [
    'TBB.B',
    'BB.B.',
    '..B.B',
    '.BBB.',
    'B...B',
  ],
  // 2
  [
    'BBB..',
    'B.BB.',
    '.B..B',
    'B..BB',
    '..BBT',
  ],
  // 3
  [
    'BB.B.',
    'T..B.',
    'B..BB',
    '.BB.B',
    'BBBB.',
  ],
  // 4
  [
    '.B.B.',
    '..B.B',
    '...TB',
    '..BBB',
    'B.B.B',
  ],
  // 5
  [
    'BTBB.',
    '...B.',
    'BBBB.',
    'BB...',
    'BB.B.',
  ],
  // 6
  [
    '.BB..',
    'BB...',
    '.BB.B',
    '...BT',
    '..BB.',
  ],
  // 7
  [
    '..B..',
    'B.B.B',
    'TB.B.',
    'B....',
    'BB.B.',
  ],
  // 8
  [
    '.BB..',
    'B...B',
    'B....',
    '..B..',
    'B....',
  ],
  // 9
  [
    '.BBBT',
    'B.BB.',
    '....B',
    'B.BBB',
    '.....',
  ],
  // 10
  [
    '.B.BB',
    '.BBB.',
    '.B.B.',
    'BBB..',
    'TB...',
  ],
  // 11
  [
    'BBRTR',
    'B.BRB',
    '...RR',
    'B.RR.',
    'BR.RR',
  ],
  // 12
  [
    'BB..R',
    '..RR.',
    'RBBRR',
    '.RBRR',
    'B.BB.',
  ],
  // 13
  [
    '...R.',
    '.RTRR',
    'BBRR.',
    '.RRBR',
    '.R.RR',
  ],
  // 14
  [
    'BR.RR',
    'RR.RT',
    '.BBRR',
    '.BBRB',
    'B.RBB',
  ],
  // 15
  [
    'B.BRR',
    'R.BR.',
    '.RRBR',
    'RBBBR',
    '.RR.R',
  ],
  // 16
  [
    '.BR..',
    'R.RBR',
    'RRBRB',
    'TRRB.',
    'RBRRR',
  ],
  // 17
  [
    'RRR..',
    '.BRBR',
    'R.RRT',
    '.B.RR',
    'RR.BB',
  ],
  // 18
  [
    '..RB.',
    '.BRRR',
    'BRRRR',
    'RTRR.',
    '.RBR.',
  ],
  // 19
  [
    '.RBRR',
    'RRRTR',
    'B.RRR',
    '.RBR.',
    'R.RRR',
  ],
  // 20
  [
    '.RR.R',
    'R.RRR',
    'BRRBR',
    'B.RRR',
    'B..RR',
  ],
  // 21
  [
    'R.R..',
    'BRR.B',
    'RBRBR',
    '.RRRB',
    'BRTRB',
  ],
  // 22
  [
    'RRR.R',
    'BRRBB',
    '.BRR.',
    'B.RBR',
    'RRBRR',
  ],
  // 23
  [
    'BR.R.',
    '..BBB',
    '.BRRR',
    '.RRTR',
    'RB.RB',
  ],
  // 24
  [
    '.RRR.',
    'RRBBR',
    'RRR.R',
    'R.BRB',
    'BRRBB',
  ],
  // 25
  [
    '.RBRR',
    'RTR.R',
    'RR..B',
    'RBBR.',
    'R..BR',
  ],
  // 26
  [
    'R..RB',
    'RR.BR',
    '..R.R',
    'R.BRR',
    '..RBB',
  ],
  // 27
  [
    'RR.RR',
    'BB..R',
    'B.RRR',
    '.RTRR',
    'RR.BR',
  ],
  // 28
  [
    'RRRBB',
    'R.TRR',
    'BB..R',
    'R.RRB',
    'BBBRR',
  ],
  // 29
  [
    'BRRRB',
    'RR.R.',
    'R.RRR',
    'R.RRB',
    'B.RRB',
  ],
  // 30
  [
    'RRRB.',
    'BRRBR',
    'RTRRB',
    '.RR.R',
    '.R.BR',
  ],
  // 31
  [
    'RRBBR',
    '.RRBR',
    'B.RRB',
    '..RRR',
    'BBBR.',
  ],
  // 32
  [
    'RB.RR',
    'R.BBR',
    'BR.BR',
    'R.BRR',
    'RB..R',
  ],
  // 33
  [
    'B.R.L',
    'LBR.L',
    'LRRTR',
    'BLRLB',
    'B..RL',
  ],
  // 34
  [
    'B..RL',
    '.B.BR',
    'LLRLB',
    'RB.LB',
    'LBLLB',
  ],
  // 35
  [
    'LBBLB',
    'RRLLB',
    'BSTR.',
    'B..RR',
    'BBLLR',
  ],
  // 36
  [
    'L.B.R',
    '.BLBB',
    'LBRRB',
    'SL.RR',
    'TLRR.',
  ],
  // 37
  [
    'B.LRR',
    'LRBLL',
    'BLB.L',
    'R.BSR',
    'LBR.L',
  ],
  // 38
  [
    '.LRRT',
    '.R.RS',
    'RBL.R',
    'S.RLR',
    '.B.RB',
  ],
  // 39
  [
    'R..RR',
    'RLR.B',
    'RLR.B',
    'BRR.R',
    'L.BLL',
  ],
  // 40
  [
    'BR.BB',
    'RBBLL',
    'BB.RB',
    'RBB.B',
    'BRLLL',
  ],
  // 41
  [
    'R.BR.',
    'BBR.L',
    'RLLBL',
    'TRL.R',
    'SRR..',
  ],
  // 42
  [
    '.RRTR',
    '.RLLB',
    'LR.LL',
    'RBB.L',
    'RLLRR',
  ],
  // 43
  [
    '.LR..',
    'LR.LB',
    'BRBBB',
    'LLBLR',
    'LTLR.',
  ],
  // 44
  [
    '.BBRR',
    'RL.LR',
    'BRLLR',
    'L.RRR',
    'R.RRL',
  ],
  // 45
  [
    '..LRR',
    '.LRLL',
    'R.RLB',
    '.BBLR',
    '.LBLL',
  ],
  // 46
  [
    'RBLRL',
    '..RRT',
    '.LBRS',
    'LB.LS',
    'B.RR.',
  ],
  // 47
  [
    'LRB.B',
    'LR.RL',
    'TLLLR',
    'RR.RL',
    'LBLLB',
  ],
  // 48
  [
    'BR..R',
    'B.RLR',
    'B.LRB',
    'R.BB.',
    'LBRLT',
  ],
  // 49
  [
    'TRRLL',
    'LRB.R',
    '.BBBR',
    'B.BLL',
    'B.B.B',
  ],
  // 50
  [
    'BLBBR',
    'BRRSL',
    'RRLRL',
    'RLRLB',
    '.LRRR',
  ],
  // 51
  [
    'RBRLB',
    'BBRLB',
    '.L.LR',
    'B.RRL',
    '.RSTL',
  ],
  // 52
  [
    'R.B.L',
    'TRR.B',
    'L.BLB',
    'BSRL.',
    'R.LR.',
  ],
  // 53
  [
    'RBRLR',
    'BBRLB',
    'L..LL',
    '.BRLT',
    '.B.LS',
  ],
  // 54
  [
    'BRL.R',
    'RB.RR',
    'BLRBB',
    'B.LSL',
    'BBRRR',
  ],
  // 55
  [
    '.BRRL',
    'BRR.R',
    'L.SBL',
    'LBLR.',
    'BRBRL',
  ],
  // 56
  [
    'LTSLR',
    'BL.RL',
    'LRS.S',
    '.RLBR',
    '.LLRL',
  ],
  // 57
  [
    'L.LSL',
    'BBLRL',
    '.BSSR',
    'SLLTL',
    'SBRBR',
  ],
  // 58
  [
    'SRTSS',
    'RLR.R',
    'SBBSR',
    'SL.RB',
    'SBS.S',
  ],
  // 59
  [
    'SBRSS',
    'RLLRR',
    'SRSLL',
    'B.SLL',
    'LST.L',
  ],
  // 60
  [
    'BRLRB',
    'LSBLB',
    'LRBLB',
    'BLLRL',
    'RSL..',
  ],
  // 61
  [
    'RSSSS',
    'BBLRR',
    'RL.BB',
    'B.SBS',
    'L..LL',
  ],
  // 62
  [
    'LBBSR',
    'SBSTL',
    'SSSSB',
    'RBL.R',
    'B.LRS',
  ],
  // 63
  [
    'RRRLS',
    'LSS.R',
    'B.SLS',
    'LTRB.',
    'LLRRR',
  ],
  // 64
  [
    'BSLBS',
    'LR.SR',
    'RBLRT',
    '.BLLL',
    'RSLBL',
  ],
  // 65
  [
    'SLBRS',
    'RTRSR',
    'BSLSS',
    '.SBBS',
    'LLLSL',
  ],
  // 66
  [
    'BBSBB',
    'BBLBR',
    'LSSTR',
    'RS.SB',
    'RBLBB',
  ],
  // 67
  [
    'RBSL.',
    'LR.RB',
    'S.SLS',
    'RSLSR',
    'RRL.L',
  ],
  // 68
  [
    'BRL.L',
    'RSBLL',
    'LSRRS',
    'LBSBS',
    'BBSRR',
  ],
  // 69
  [
    'RLLBS',
    'RBSRS',
    'SBLLL',
    'SRLS.',
    'BLRBL',
  ],
  // 70
  [
    'RLL.L',
    'SRSRB',
    'LTSB.',
    'SLBR.',
    'BLBBS',
  ],
  // 71
  [
    'RSLRR',
    'RSRB.',
    'SSRRB',
    'SRTLS',
    'LLRL.',
  ],
  // 72
  [
    'LRLSL',
    'RLSRS',
    'R.LRL',
    'LSBL.',
    '..RSL',
  ],
  // 73
  [
    'BLLSS',
    'LR.LS',
    'STLSS',
    'LSRR.',
    'RLSSS',
  ],
  // 74
  [
    'RRSBR',
    'SLSLR',
    'SLLBS',
    'BSSSL',
    '.SSLT',
  ],
  // 75
  [
    'RRSRL',
    'SL.RL',
    'LRLBS',
    'S.S.S',
    'R.RLL',
  ],
  // 76
  [
    '.BSLB',
    'RRRLB',
    '.RRS.',
    'SBRBS',
    '.SSRB',
  ],
  // 77
  [
    'TRL.S',
    'SLR.R',
    'SLRR.',
    'BRLR.',
    '.SRLL',
  ],
  // 78
  [
    'LLLRL',
    'LLSLL',
    'SSLSR',
    'RLSSR',
    'RLLRS',
  ],
  // 79
  [
    'SRRRL',
    'SLSRR',
    'SRSRS',
    'SLSLL',
    'RLRLL',
  ],
  // 80
  [
    'SRSRR',
    'RRLSL',
    'LSRLR',
    'LSLSL',
    'LRRTL',
  ],
  // 81
  [
    'RRLSL',
    'TRRLL',
    'RLRSS',
    'LSSLS',
    'LRLSR',
  ],
  // 82
  [
    'SRSRS',
    'SLLLR',
    'RLSRS',
    'RRLRT',
    'SLLRR',
  ],
  // 83
  [
    'LLSRS',
    'LLSRL',
    'LRRRS',
    'SSLSR',
    'RRRSS',
  ],
  // 84
  [
    'STRLS',
    'LRSSL',
    'LLSSR',
    'RLLLR',
    'LLRSS',
  ],
  // 85
  [
    'SRLRR',
    'LRRSS',
    'SLSSS',
    'LLLTS',
    'LSSSR',
  ],
  // 86
  [
    'SSSLL',
    'RTLSS',
    'SRSRS',
    'RSSRL',
    'SSRLS',
  ],
  // 87
  [
    'LSRRR',
    'SLLRS',
    'SRLRS',
    'LLSLL',
    'TSLLL',
  ],
  // 88
  [
    'LSSST',
    'SRSSL',
    'LRSLR',
    'SRRLR',
    'LRSSR',
  ],
  // 89
  [
    'RLRSL',
    'LSRRR',
    'LSSRS',
    'TRRSS',
    'LSRRS',
  ],
  // 90
  [
    'SSRRL',
    'LRLRT',
    'RRSRL',
    'LSRSL',
    'LRSRL',
  ],
  // 91
  [
    'RRSRR',
    'SRSLR',
    'RSLRS',
    'SSRLR',
    'LSSSL',
  ],
  // 92
  [
    'LSLRS',
    'RRRRR',
    'SSRLS',
    'LSRLL',
    'RSLRR',
  ],
  // 93
  [
    'RSRRR',
    'SRRSS',
    'RRLRS',
    'LRSSR',
    'RLSRL',
  ],
  // 94
  [
    'SSLRS',
    'RLLSL',
    'LLSRR',
    'SLRLL',
    'RTRSR',
  ],
  // 95
  [
    'SSSSR',
    'SLLLL',
    'RRRRL',
    'LLLRL',
    'SSSSL',
  ],
  // 96
  [
    'LRSRL',
    'LSLRL',
    'SLRRL',
    'SRSSR',
    'LSRRR',
  ],
  // 97
  [
    'SRLTS',
    'RSLLS',
    'RLLLS',
    'RRLLR',
    'SLSLR',
  ],
  // 98
  [
    'LRLSS',
    'RSRSL',
    'SLLSR',
    'LRSRS',
    'SSTRL',
  ],
  // 99
  [
    'LLSLS',
    'RLSLS',
    'RSSRS',
    'RSRRR',
    'LLRLS',
  ],
  // 100
  [
    'LRSRL',
    'RSLSL',
    'TRSSS',
    'LRSRS',
    'SLRRR',
  ],


];


  constructor(private router: Router, private readingMouseTracker: ReadingMouseDataService, private testMouseTracker: VisualSearchTestMouseDataService, private vsRecreater: VisualSearchRecreationService) { }

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
    if (!this.testEnded) {
      this.readingMouseTracker.startTracking('visualSearchInstructions', this.startX, this.startY)
    }
  }

  startTest(event: MouseEvent) {
    this.showInstructions = false;
    this.readingMouseTracker.stopTracking();
    this.saveMousePosition(event);
    this.generateTrial();
  }


  /*generateTrial() {
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
    this.testMouseTracker.startTracking(this.trialIndex, this.noTarget, this.startX, this.startY);

    this.vsRecreater.virtualSearchIterLayout(this.items, this.trialIndex);

  }*/

  private buildItemsFromMap(map5x5: string[]): { items: VisualItem[], hasTarget: boolean } {
    const items: VisualItem[] = [];
    let hasTarget = false;

    // bezbednost
    if (!map5x5 || map5x5.length !== 5 || map5x5.some(r => r.length !== 5)) {
      throw new Error('Mapa mora biti 5 redova po 5 karaktera.');
    }

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const ch = map5x5[row][col];
        const item = new VisualItem();
        item.x = col * 100;
        item.y = row * 100;

        switch (ch) {
          case '.':
            item.isVisible = false;
            // default boja/orijentacija može ostati kako god, jer je nevidljiv
            break;
          case 'B':
            item.isVisible = true;
            item.color = 'blue';
            item.orientation = 'normal';
            break;
          case 'R':
            item.isVisible = true;
            item.color = 'red';
            item.orientation = 'rotated';
            break;
          case 'L':
            item.isVisible = true;
            item.color = 'red';
            item.orientation = 'semi-rotated-left';
            break;
          case 'S':
            item.isVisible = true;
            item.color = 'red';
            item.orientation = 'semi-rotated-right';
            break;
          case 'T':
            item.isVisible = true;
            item.color = 'red';
            item.orientation = 'normal';
            item.isTarget = true;
            hasTarget = true;
            break;
          default:
            // nepoznat znak – tretiramo kao prazno
            item.isVisible = false;
        }

        items.push(item);
      }
    }
    return { items, hasTarget };
  }

  // ---------- IZMENJENO: više nema random, već čita unapred zadatu mapu ----------
  generateTrial() {
    this.items = [];

    const index0 = this.trialIndex - 1; // jer si krenula od 1
    if (index0 >= this.predefinedMaps.length) {
      // nema više predefinisanih – završavamo test
      this.testEnded = true;
      this.readingMouseTracker.startTracking('visualEnd', this.startX, this.startY);
      return;
    }

    const map = this.predefinedMaps[index0];
    const { items, hasTarget } = this.buildItemsFromMap(map);
    this.items = items;

    // vreme + tracking
    this.stimulusShownAt = Date.now();
    this.testMouseTracker.startTracking(this.trialIndex, !hasTarget /* noTarget */, this.startX, this.startY);

  }

  handleClick(item: VisualItem) {
    const isCorrect = item.isTarget;
    //alert(isCorrect ? 'Tačno!' : 'Netačno!');
    const responseGivenAt = Date.now();
    this.reactionTime = responseGivenAt - this.stimulusShownAt;

    this.testMouseTracker.stopTracking(isCorrect, this.reactionTime);

    if (this.trialIndex >= 100) {
      this.testEnded = true;
      const raw = localStorage.getItem('startMousePosition');
      if (raw) {
        const { x, y } = JSON.parse(raw);
        this.startX = x;
        this.startY = y;
        console.log('Početna pozicija miša:', x, y);
      }
      this.readingMouseTracker.startTracking('visualEnd', this.startX, this.startY)
      return
    } else {
      this.noTarget = false;
      this.trialIndex++;
    }
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
    if (this.trialIndex > 100) {
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

  goBack() {
    this.readingMouseTracker.stopTracking()
    localStorage.removeItem('test');
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
