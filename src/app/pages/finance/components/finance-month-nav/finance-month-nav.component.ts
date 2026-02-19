// finance-month-nav.component.ts
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe } from '@angular/common';
import * as FinanceActions from '../../../../store/actions/finance.action';

import { selectSelectedMonth } from '../../../../store/selectors/finance.selector';

@Component({
  selector: 'app-finance-month-nav',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './finance-month-nav.component.html',
  styleUrl: './finance-month-nav.component.css',
})
export class FinanceMonthNavComponent {
  private store = inject(Store);

  selectedMonth$ = this.store.select(selectSelectedMonth);

  navigatePrev(): void {
    this.store.dispatch(FinanceActions.navigatePrevMonth());
  }

  navigateNext(): void {
    this.store.dispatch(FinanceActions.navigateNextMonth());
  }
}