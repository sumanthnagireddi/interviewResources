import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsOverBudget, selectIsNearAlert, selectPercentUsed } from '../../../../store/selectors/finance.selector';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-finance-budget-alert',
  imports: [AsyncPipe, NgIf,CurrencyPipe],
  templateUrl: './finance-budget-alert.component.html',
  styleUrl: './finance-budget-alert.component.css'
})
export class FinanceBudgetAlertComponent {
private store = inject(Store);

  isOverBudget$ = this.store.select(selectIsOverBudget);
  isNearAlert$  = this.store.select(selectIsNearAlert);
  percentUsed$  = this.store.select(selectPercentUsed);
  overBy$       = this.store.select(
    (s) => {
      // inline: totalSpent - budget
      const fin = (s as any).finance;
      const spent  = fin.currentMonthExpenses?.reduce((a: number, e: any) => a + e.amount, 0) ?? 0;
      const budget = fin.currentBudget?.monthlyBudget ?? 0;
      return spent - budget;
    }
  );
}
