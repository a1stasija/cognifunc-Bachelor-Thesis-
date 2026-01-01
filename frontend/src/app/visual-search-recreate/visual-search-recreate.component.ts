import { Component } from '@angular/core';
import { VisualItem } from '../models/VisualItem';
import { VisualSearchRecreationService } from '../services/visual-search-recreation.service';

@Component({
  selector: 'app-visual-search-recreate',
  templateUrl: './visual-search-recreate.component.html',
  styleUrls: ['./visual-search-recreate.component.css']
})
export class VisualSearchRecreateComponent {
  sessionId: string = '';
  iter: number = 0;
  items: VisualItem[] = [];
  error = '';
  loaded = false;
  showReconstruction = false;

  constructor(private reconService: VisualSearchRecreationService) { }

  fetchData() {
    if (!this.sessionId || this.iter === null) {
      this.error = 'Unesi validan session ID i iteraciju.';
      return;
    }

    this.reconService.getVisualSearchIterLayout(this.sessionId, this.iter).subscribe({
      next: (data) => {
        this.items = data.items;
        this.error = '';
        this.loaded = true;

        console.log('Primljeni itemi:', this.items);

      },
      error: (err) => {
        this.error = 'Greška pri učitavanju podataka.';
        this.loaded = false;
      }
    });

    this.showReconstruction = true;
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

