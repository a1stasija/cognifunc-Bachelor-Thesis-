import { Component } from '@angular/core';
import { FlankerRecreationService } from '../services/flanker-recreation.service';
import { RecreationFData } from '../models/RecreationFData';

@Component({
  selector: 'app-flanker-recreate',
  templateUrl: './flanker-recreate.component.html',
  styleUrls: ['./flanker-recreate.component.css']
})
export class FlankerRecreateComponent {
sessionId: string = '';
  trialIndex: number = 1;
  trialData?: RecreationFData;
  stimulus: string[] = [];
  error = '';
  loaded = false;
  showResults = false;

  constructor(private flankerService: FlankerRecreationService) {}

  fetchData() {
    if (!this.sessionId || !this.trialIndex) {
      this.error = 'Unesi session ID i broj iteracije.';
      return;
    }

    this.flankerService.getFlankerItemsData(this.sessionId, this.trialIndex).subscribe({
      next: (data) => {
        this.trialData = data;
        this.stimulus = data.stimulus;
        this.loaded = true;
        this.error = '';
        console.log('Dobijena iteracija:', data);
        this.showResults = true
      },
      error: () => {
        this.error = 'Greška pri učitavanju podataka.';
        this.loaded = false;
      }
    });
  }

}
