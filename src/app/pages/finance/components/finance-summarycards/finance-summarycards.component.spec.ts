import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceSummarycardsComponent } from './finance-summarycards.component';

describe('FinanceSummarycardsComponent', () => {
  let component: FinanceSummarycardsComponent;
  let fixture: ComponentFixture<FinanceSummarycardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceSummarycardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceSummarycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
