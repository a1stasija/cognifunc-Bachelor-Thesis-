import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualSearchRecreateComponent } from './visual-search-recreate.component';

describe('VisualSearchRecreateComponent', () => {
  let component: VisualSearchRecreateComponent;
  let fixture: ComponentFixture<VisualSearchRecreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualSearchRecreateComponent]
    });
    fixture = TestBed.createComponent(VisualSearchRecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
