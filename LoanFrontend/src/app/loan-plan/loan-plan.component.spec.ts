import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPlanComponent } from './loan-plan.component';

describe('LoanPlanComponent', () => {
  let component: LoanPlanComponent;
  let fixture: ComponentFixture<LoanPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
