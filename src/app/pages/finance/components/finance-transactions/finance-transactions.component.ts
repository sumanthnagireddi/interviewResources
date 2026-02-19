import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  EXPENSE_CATEGORIES,
  Expense,
  ExpenseCategory,
  CategoryConfig,
} from '../../../../model/finance.model';
import {
  selectCurrentMonthExpenses,
  selectDeleteConfirmId,
} from '../../../../store/selectors/finance.selector';
import { AsyncPipe, NgFor, NgIf, DatePipe, NgClass } from '@angular/common';
import * as FinanceActions from '../../../../store/actions/finance.action';
@Component({
  selector: 'app-finance-transactions',
  imports: [AsyncPipe, NgFor, NgIf, DatePipe, NgClass],
  templateUrl: './finance-transactions.component.html',
  styleUrl: './finance-transactions.component.css',
})
export class FinanceTransactionsComponent {
  private store = inject(Store);

  expenses$ = this.store.select(selectCurrentMonthExpenses);
  deleteConfirmId$ = this.store.select(selectDeleteConfirmId);
  categories = EXPENSE_CATEGORIES;

  openAdd(): void {
    this.store.dispatch(FinanceActions.openAddExpenseForm());
  }
  openEdit(e: Expense): void {
    this.store.dispatch(FinanceActions.openEditExpenseForm({ expense: e }));
  }
  confirmDelete(id: string): void {
    this.store.dispatch(FinanceActions.confirmDeleteExpense({ id }));
  }
  cancelDelete(): void {
    this.store.dispatch(FinanceActions.cancelDeleteExpense());
  }
  deleteExpense(id: string): void {
    this.store.dispatch(FinanceActions.deleteExpense({ id }));
  }

  getCategoryConfig(key: ExpenseCategory): CategoryConfig {
    return (
      this.categories.find((c) => c.key === key) ??
      this.categories[this.categories.length - 1]
    );
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }
}
