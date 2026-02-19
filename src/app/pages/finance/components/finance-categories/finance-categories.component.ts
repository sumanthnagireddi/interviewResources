import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgClass } from '@angular/common';
import { EXPENSE_CATEGORIES, ExpenseCategory } from '../../../../model/finance.model';
import { selectCategoryTotal } from '../../../../store/selectors/finance.selector';

@Component({
  selector: 'app-finance-categories',
  imports: [AsyncPipe,NgClass],
  templateUrl: './finance-categories.component.html',
  styleUrl: './finance-categories.component.css'
})
export class FinanceCategoriesComponent {
private store = inject(Store);
  categories = EXPENSE_CATEGORIES;

  getCategoryTotal(key: ExpenseCategory) {
    return this.store.select(selectCategoryTotal(key));
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR',
      minimumFractionDigits: 0, maximumFractionDigits: 2,
    }).format(amount);
  }
}
