import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceHeaderComponent } from './finance-header.component';

describe('FinanceHeaderComponent', () => {
  let component: FinanceHeaderComponent;
  let fixture: ComponentFixture<FinanceHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
