import { AsyncPipe, NgFor, NgIf, DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EXPENSE_CATEGORIES, ExpenseCategory, CategoryConfig } from '../../../../model/finance.model';
import { selectCategoryBreakdown, selectCurrentMonthExpenses, selectTotalSpent } from '../../../../store/selectors/finance.selector';
import * as FinanceActions from '../../../../store/actions/finance.action';
@Component({
  selector: 'app-finance-overview',
  imports: [AsyncPipe, NgFor, NgIf, DatePipe,NgClass],
  templateUrl: './finance-overview.component.html',
  styleUrl: './finance-overview.component.css'
})
export class FinanceOverviewComponent {
private store = inject(Store);

  categoryBreakdown$ = this.store.select(selectCategoryBreakdown);
  expenses$          = this.store.select(selectCurrentMonthExpenses);
  totalSpent$        = this.store.select(selectTotalSpent);
  categories         = EXPENSE_CATEGORIES;

  goToTransactions(): void {
    this.store.dispatch(FinanceActions.setActiveTab({ tab: 'transactions' }));
  }

  getCategoryConfig(key: ExpenseCategory): CategoryConfig {
    return this.categories.find((c) => c.key === key) ?? this.categories[this.categories.length - 1];
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR',
      minimumFractionDigits: 0, maximumFractionDigits: 2,
    }).format(amount);
  }
}
