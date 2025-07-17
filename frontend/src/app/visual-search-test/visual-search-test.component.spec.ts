import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualSearchTestComponent } from './visual-search-test.component';

describe('VisualSearchTestComponent', () => {
  let component: VisualSearchTestComponent;
  let fixture: ComponentFixture<VisualSearchTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualSearchTestComponent]
    });
    fixture = TestBed.createComponent(VisualSearchTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
