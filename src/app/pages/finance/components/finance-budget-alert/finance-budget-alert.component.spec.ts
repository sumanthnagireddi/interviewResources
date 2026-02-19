import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBudgetAlertComponent } from './finance-budget-alert.component';

describe('FinanceBudgetAlertComponent', () => {
  let component: FinanceBudgetAlertComponent;
  let fixture: ComponentFixture<FinanceBudgetAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceBudgetAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceBudgetAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
