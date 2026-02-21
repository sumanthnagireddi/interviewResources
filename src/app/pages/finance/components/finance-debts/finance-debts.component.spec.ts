import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDebtsComponent } from './finance-debts.component';

describe('FinanceDebtsComponent', () => {
  let component: FinanceDebtsComponent;
  let fixture: ComponentFixture<FinanceDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceDebtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
