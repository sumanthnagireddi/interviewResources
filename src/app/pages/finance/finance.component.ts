import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../../services/finance.service';
import {
  Expense,
  ExpenseCategory,
  BudgetSettings,
  EXPENSE_CATEGORIES,
  CategoryConfig,
  ParsedSmsTransaction,
} from '../../model/finance.model';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css',
})
export class FinanceComponent implements OnInit {
  private readonly financeService = inject(FinanceService);

  // Data signals
  expenses = signal<Expense[]>([]);
  currentBudget = signal<BudgetSettings>({ monthlyBudget: 0, alertThreshold: 80 });
  categories = EXPENSE_CATEGORIES;

  // UI state
  showAddForm = signal(false);
  showBudgetSettings = signal(false);
  selectedMonth = signal(new Date());
  activeTab = signal<'overview' | 'transactions' | 'categories' | 'sms'>('overview');
  deleteConfirmId = signal<string | null>(null);
  showEditForm = signal(false);
  editingExpenseId = signal<string | null>(null);

  // Edit form model
  editExpense = {
    title: '',
    amount: 0,
    category: 'food' as ExpenseCategory,
    date: '',
    notes: '',
  };

  // SMS Analyzer state
  smsRawText = signal('');
  parsedTransactions = signal<ParsedSmsTransaction[]>([]);
  smsImporting = signal(false);

  // Form model
  newExpense = {
    title: '',
    amount: 0,
    category: 'food' as ExpenseCategory,
    date: new Date().toISOString().split('T')[0],
    notes: '',
  };

  budgetForm = {
    monthlyBudget: 0,
    alertThreshold: 80,
  };

  // Computed values
  currentMonthKey = computed(() => {
    const d = this.selectedMonth();
    return this.financeService.getMonthKey(d.getFullYear(), d.getMonth() + 1);
  });

  currentMonthExpenses = computed(() => {
    const d = this.selectedMonth();
    return this.financeService.getExpensesForMonth(d.getFullYear(), d.getMonth() + 1);
  });

  monthSummary = computed(() => {
    const d = this.selectedMonth();
    return this.financeService.getMonthSummary(d.getFullYear(), d.getMonth() + 1);
  });

  categoryBreakdown = computed(() => {
    return this.financeService.getTotalByCategory(this.currentMonthExpenses());
  });

  isOverBudget = computed(() => {
    const summary = this.monthSummary();
    return summary.budget > 0 && summary.totalSpent > summary.budget;
  });

  isNearAlert = computed(() => {
    const summary = this.monthSummary();
    const budget = this.currentBudget();
    return summary.budget > 0 && summary.percentUsed >= budget.alertThreshold && !this.isOverBudget();
  });

  monthLabel = computed(() => {
    return this.selectedMonth().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  // SMS computed
  selectedSmsCount = computed(() => this.parsedTransactions().filter(t => t.selected).length);
  selectedSmsTotal = computed(() =>
    this.parsedTransactions().filter(t => t.selected).reduce((sum, t) => sum + t.amount, 0)
  );

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.expenses.set(this.financeService.getExpenses());
    const monthKey = this.financeService.getMonthKey(
      this.selectedMonth().getFullYear(),
      this.selectedMonth().getMonth() + 1
    );
    this.currentBudget.set(this.financeService.getBudgetForMonth(monthKey));
    this.budgetForm.monthlyBudget = this.currentBudget().monthlyBudget;
    this.budgetForm.alertThreshold = this.currentBudget().alertThreshold;
    // Force re-compute
    this.selectedMonth.set(new Date(this.selectedMonth()));
  }

  // ───── Add Expense ─────
  openAddForm(): void {
    this.newExpense = {
      title: '',
      amount: 0,
      category: 'food',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    };
    this.showAddForm.set(true);
  }

  submitExpense(): void {
    if (!this.newExpense.title.trim() || this.newExpense.amount <= 0) return;
    this.financeService.addExpense({
      title: this.newExpense.title.trim(),
      amount: this.newExpense.amount,
      category: this.newExpense.category,
      date: this.newExpense.date,
      notes: this.newExpense.notes?.trim() || '',
      source: 'manual',
    });
    this.showAddForm.set(false);
    this.reload();
  }

  // ───── Delete Expense ─────
  confirmDelete(id: string): void {
    this.deleteConfirmId.set(id);
  }

  cancelDelete(): void {
    this.deleteConfirmId.set(null);
  }

  deleteExpense(id: string): void {
    this.financeService.deleteExpense(id);
    this.deleteConfirmId.set(null);
    this.reload();
  }

  // ───── Edit Expense ─────
  openEditForm(expense: Expense): void {
    this.editingExpenseId.set(expense.id);
    this.editExpense = {
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      notes: expense.notes || '',
    };
    this.showEditForm.set(true);
  }

  submitEdit(): void {
    const id = this.editingExpenseId();
    if (!id || !this.editExpense.title.trim() || this.editExpense.amount <= 0) return;
    this.financeService.updateExpense(id, {
      title: this.editExpense.title.trim(),
      amount: this.editExpense.amount,
      category: this.editExpense.category,
      date: this.editExpense.date,
      notes: this.editExpense.notes?.trim() || '',
    });
    this.showEditForm.set(false);
    this.editingExpenseId.set(null);
    this.reload();
  }

  // ───── Budget Settings (month-specific) ─────
  openBudgetSettings(): void {
    const monthKey = this.currentMonthKey();
    const budget = this.financeService.getBudgetForMonth(monthKey);
    this.budgetForm.monthlyBudget = budget.monthlyBudget;
    this.budgetForm.alertThreshold = budget.alertThreshold;
    this.showBudgetSettings.set(true);
  }

  saveBudget(): void {
    const monthKey = this.currentMonthKey();
    this.financeService.saveBudgetForMonth(monthKey, {
      monthlyBudget: this.budgetForm.monthlyBudget,
      alertThreshold: this.budgetForm.alertThreshold,
    });
    this.showBudgetSettings.set(false);
    this.reload();
  }

  copyBudgetFromPrevMonth(): void {
    const d = new Date(this.selectedMonth());
    d.setMonth(d.getMonth() - 1);
    const prevKey = this.financeService.getMonthKey(d.getFullYear(), d.getMonth() + 1);
    const prevBudget = this.financeService.getBudgetForMonth(prevKey);
    this.budgetForm.monthlyBudget = prevBudget.monthlyBudget;
    this.budgetForm.alertThreshold = prevBudget.alertThreshold;
  }

  // ───── Month Navigation ─────
  prevMonth(): void {
    const d = new Date(this.selectedMonth());
    d.setMonth(d.getMonth() - 1);
    this.selectedMonth.set(d);
    this.reload();
  }

  nextMonth(): void {
    const d = new Date(this.selectedMonth());
    d.setMonth(d.getMonth() + 1);
    this.selectedMonth.set(d);
    this.reload();
  }

  // ───── SMS Analyzer ─────
  analyzeSms(): void {
    const text = this.smsRawText();
    if (!text.trim()) return;
    const parsed = this.financeService.parseSmsMessages(text);
    this.parsedTransactions.set(parsed);
  }

  clearSmsResults(): void {
    this.smsRawText.set('');
    this.parsedTransactions.set([]);
  }

  toggleSmsSelection(id: string): void {
    this.parsedTransactions.update(items =>
      items.map(t => t.id === id ? { ...t, selected: !t.selected } : t)
    );
  }

  toggleAllSms(selected: boolean): void {
    this.parsedTransactions.update(items =>
      items.map(t => ({ ...t, selected }))
    );
  }

  updateSmsCategory(id: string, category: ExpenseCategory): void {
    this.parsedTransactions.update(items =>
      items.map(t => t.id === id ? { ...t, category } : t)
    );
  }

  importSelectedSms(): void {
    const selected = this.parsedTransactions().filter(t => t.selected);
    if (selected.length === 0) return;

    this.smsImporting.set(true);
    const expenses = selected.map(t => ({
      title: t.merchant,
      amount: t.amount,
      category: t.category,
      date: t.date,
      notes: `SMS: ${t.rawText.substring(0, 100)}`,
      source: 'sms' as const,
    }));

    this.financeService.addExpenses(expenses);

    // Remove imported items from list
    this.parsedTransactions.update(items =>
      items.filter(t => !t.selected)
    );
    this.smsImporting.set(false);
    this.reload();
  }

  // ───── Helpers ─────
  getCategoryConfig(key: ExpenseCategory): CategoryConfig {
    return this.categories.find(c => c.key === key) || this.categories[this.categories.length - 1];
  }

  getCategoryTotal(key: ExpenseCategory): number {
    return this.currentMonthExpenses()
      .filter(e => e.category === key)
      .reduce((sum, e) => sum + e.amount, 0);
  }

  getProgressColor(): string {
    const pct = this.monthSummary().percentUsed;
    if (pct >= 100) return 'bg-red-500';
    if (pct >= 80) return 'bg-amber-500';
    return 'bg-accent';
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
