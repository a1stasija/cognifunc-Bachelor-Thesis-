import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlankerRecreateComponent } from './flanker-recreate.component';

describe('FlankerRecreateComponent', () => {
  let component: FlankerRecreateComponent;
  let fixture: ComponentFixture<FlankerRecreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlankerRecreateComponent]
    });
    fixture = TestBed.createComponent(FlankerRecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
