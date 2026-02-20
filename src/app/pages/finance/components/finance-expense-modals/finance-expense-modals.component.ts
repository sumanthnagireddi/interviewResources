import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  EXPENSE_CATEGORIES,
  ExpenseCategory,
} from '../../../../model/finance.model';
import { take } from 'rxjs';
import {
  selectShowAddForm,
  selectShowEditForm,
  selectSavingExpense,
  selectEditingExpense,
} from '../../../../store/selectors/finance.selector';
import * as FinanceActions from '../../../../store/actions/finance.action';
@Component({
  selector: 'app-finance-expense-modals',
  imports: [AsyncPipe, FormsModule, NgClass, NgTemplateOutlet],
  templateUrl: './finance-expense-modals.component.html',
  styleUrl: './finance-expense-modals.component.css',
})
export class FinanceExpenseModalsComponent {
  private store = inject(Store);

  showAddForm$ = this.store.select(selectShowAddForm);
  showEditForm$ = this.store.select(selectShowEditForm);
  saving$ = this.store.select(selectSavingExpense);
  categories = EXPENSE_CATEGORIES;

  newExpense = {
    title: '',
    amount: 0,
    category: 'food' as ExpenseCategory,
    date: new Date().toISOString().split('T')[0],
    notes: '',
    cardType: 'axis',
  };

  editExpense = {
    title: '',
    amount: 0,
    category: 'food' as ExpenseCategory,
    date: '',
    notes: '',
    cardType: 'axis',
  };
  // Add this to your class properties
  cardOptions = [
    { id: 'axis', label: 'Axis Bank', color: 'bg-[#971237]' },
    { id: 'hdfc', label: 'HDFC Bank', color: 'bg-[#004c8f]' },
    {
      id: 'icici-amazon',
      label: 'ICICI Amazon Pay',
      color: 'bg-gradient-to-r from-[#232f3e] to-[#ff9900]',
    },
    { id: 'icici-visa', label: 'ICICI Visa', color: 'bg-[#1a1f71]' },
    {
      id: 'icici-mastercard',
      label: 'ICICI Mastercard',
      color: 'bg-[#222222]',
    },
    { id: 'icici-amex', label: 'ICICI Amex', color: 'bg-[#007bc1]' },
  ];

  ngOnInit(): void {
    // Sync editExpense form when store sets editingExpense
    this.store.select(selectEditingExpense).subscribe((expense) => {
      if (expense) {
        this.editExpense = {
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          date: expense.date,
          notes: expense.notes ?? '',
          cardType: expense.cardType || 'axis', // <-- use 'cardType' field from schema
        };
      }
    });
  
  }

  closeAdd(): void {
    this.store.dispatch(FinanceActions.closeAddExpenseForm());
  }
  closeEdit(): void {
    this.store.dispatch(FinanceActions.closeEditExpenseForm());
  }

  submitAdd(): void {
    if (!this.newExpense.title.trim() || this.newExpense.amount <= 0) return;
    this.store.dispatch(
      FinanceActions.addExpense({
        expense: {
          ...this.newExpense,
          source: 'manual',
          createdAt: new Date().toISOString(),
        },
      }),
    );
  }

  // finance-expense-modals.component.ts
  submitEdit(): void {
    if (!this.editExpense.title.trim() || this.editExpense.amount <= 0) return;

    // FIX: use take(1) and check id exists before dispatching
    this.store
      .select(selectEditingExpense)
      .pipe(take(1))
      .subscribe((expense: any) => {
        if (!expense?._id) {
          console.error('No editing expense id found in store:', expense);
          return;
        }

        console.log('dispatching updateExpense with id:', expense._id); // debug

        this.store.dispatch(
          FinanceActions.updateExpense({
            id: expense._id, // <-- make sure this is '_id' if MongoDB
            changes: {
              title: this.editExpense.title.trim(),
              amount: this.editExpense.amount,
              category: this.editExpense.category,
              date: this.editExpense.date,
              notes: this.editExpense.notes?.trim() ?? '',
            },
          }),
        );
      });
  }
}
