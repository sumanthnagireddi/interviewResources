import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceExpenseModalsComponent } from './finance-expense-modals.component';

describe('FinanceExpenseModalsComponent', () => {
  let component: FinanceExpenseModalsComponent;
  let fixture: ComponentFixture<FinanceExpenseModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceExpenseModalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceExpenseModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
