import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMonthlyBudget, selectTotalSpent, selectPercentUsed, selectProgressColor } from '../../../../store/selectors/finance.selector';
import { AsyncPipe, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-finance-progress-bar',
  imports: [AsyncPipe, NgClass],
  templateUrl: './finance-progress-bar.component.html',
  styleUrl: './finance-progress-bar.component.css'
})
export class FinanceProgressBarComponent {
 private store = inject(Store);

  monthlyBudget$ = this.store.select(selectMonthlyBudget);
  totalSpent$    = this.store.select(selectTotalSpent);
  percentUsed$   = this.store.select(selectPercentUsed);
  progressColor$ = this.store.select(selectProgressColor);

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR',
      minimumFractionDigits: 0, maximumFractionDigits: 2,
    }).format(amount);
  }
}
