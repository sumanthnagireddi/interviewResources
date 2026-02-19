import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceTransactionsComponent } from './finance-transactions.component';

describe('FinanceTransactionsComponent', () => {
  let component: FinanceTransactionsComponent;
  let fixture: ComponentFixture<FinanceTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
