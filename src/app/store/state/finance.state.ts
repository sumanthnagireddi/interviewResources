
import { BudgetSettings, Expense, ExpenseCategory, ParsedSmsTransaction } from '../../model/finance.model';

export interface FinanceState {
  // Data
  allExpenses: Expense[];
  currentMonthExpenses: Expense[];
  currentBudget: BudgetSettings | null;

  // Month navigation
  selectedMonth: string; // ISO string e.g. "2026-02-01"

  // Tab
  activeTab: 'overview' | 'transactions' | 'categories' | 'sms';

  // UI modal flags
  showAddForm: boolean;
  showEditForm: boolean;
  showBudgetSettings: boolean;
  editingExpense: Expense | null;
  deleteConfirmId: string | null;

  // SMS
  smsRawText: string;
  parsedTransactions: ParsedSmsTransaction[];
  smsImporting: boolean;

  // Loading / Error
  loadingExpenses: boolean;
  loadingBudget: boolean;
  savingBudget: boolean;
  savingExpense: boolean;
  error: string | null;
}

export const initialFinanceState: FinanceState = {
  allExpenses: [],
  currentMonthExpenses: [],
  currentBudget: null,

  selectedMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),

  activeTab: 'overview',

  showAddForm: false,
  showEditForm: false,
  showBudgetSettings: false,
  editingExpense: null,
  deleteConfirmId: null,

  smsRawText: '',
  parsedTransactions: [],
  smsImporting: false,

  loadingExpenses: false,
  loadingBudget: false,
  savingBudget: false,
  savingExpense: false,
  error: null,
};