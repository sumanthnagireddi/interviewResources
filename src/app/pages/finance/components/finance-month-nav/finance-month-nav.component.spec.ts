import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceMonthNavComponent } from './finance-month-nav.component';

describe('FinanceMonthNavComponent', () => {
  let component: FinanceMonthNavComponent;
  let fixture: ComponentFixture<FinanceMonthNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceMonthNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceMonthNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
