import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlankerTestComponent } from './flanker-test.component';

describe('FlankerTestComponent', () => {
  let component: FlankerTestComponent;
  let fixture: ComponentFixture<FlankerTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlankerTestComponent]
    });
    fixture = TestBed.createComponent(FlankerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
