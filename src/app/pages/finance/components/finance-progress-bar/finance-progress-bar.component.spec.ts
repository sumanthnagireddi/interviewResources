import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceProgressBarComponent } from './finance-progress-bar.component';

describe('FinanceProgressBarComponent', () => {
  let component: FinanceProgressBarComponent;
  let fixture: ComponentFixture<FinanceProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
