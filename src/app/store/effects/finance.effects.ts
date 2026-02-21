// finance.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FinanceService } from '../../services/finance.service';
import * as FinanceActions from '../actions/finance.action';
import {
  selectCurrentMonthKey,
  selectParsedTransactions,
  selectSelectedMonth,
} from '../selectors/finance.selector';

@Injectable()
export class FinanceEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private financeService = inject(FinanceService);

  /* ── Reload expenses when month changes ── */
  reloadOnMonthChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FinanceActions.navigatePrevMonth,
        FinanceActions.navigateNextMonth,
        FinanceActions.setSelectedMonth,
      ),
      withLatestFrom(this.store.select(selectSelectedMonth)),
      map(([, date]) =>
        FinanceActions.loadMonthExpenses({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
        }),
      ),
    ),
  );

  /* ── Load expenses for month ── */
  // finance.effects.ts
  loadMonthExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.loadMonthExpenses),
      switchMap(({ year, month }) =>
        this.financeService.getExpensesForMonth(year, month).pipe(
          map((expenses) =>
            FinanceActions.loadMonthExpensesSuccess({ expenses }),
          ),
          catchError((error) =>
            of(
              FinanceActions.loadMonthExpensesFailure({ error: error.message }),
            ),
          ),
        ),
      ),
    ),
  );

  /* ── Also load budget when month changes ── */
  loadBudgetOnMonthChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FinanceActions.navigatePrevMonth,
        FinanceActions.navigateNextMonth,
        FinanceActions.setSelectedMonth,
      ),
      withLatestFrom(this.store.select(selectCurrentMonthKey)),
      map(([, monthKey]) => FinanceActions.loadBudgetForMonth({ monthKey })),
    ),
  );

  /* ── Load budget for month ── */
  loadBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.loadBudgetForMonth),
      switchMap(({ monthKey }) =>
        this.financeService.getBudgetForMonth(monthKey).pipe(
          map((budget) => FinanceActions.loadBudgetForMonthSuccess({ budget })),
          catchError((error) =>
            of(
              FinanceActions.loadBudgetForMonthFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  /* ── Open budget settings: load current month budget ── */
  openBudgetSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.openBudgetSettings),
      withLatestFrom(this.store.select(selectCurrentMonthKey)),
      map(([, monthKey]) => FinanceActions.loadBudgetForMonth({ monthKey })),
    ),
  );

  /* ── Copy budget from previous month ── */
  copyBudgetFromPrevMonth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.copyBudgetFromPrevMonth),
      switchMap(({ prevMonthKey }) =>
        this.financeService.getBudgetForMonth(prevMonthKey).pipe(
          map((budget) => FinanceActions.loadBudgetForMonthSuccess({ budget })),
          catchError((error) =>
            of(
              FinanceActions.loadBudgetForMonthFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  /* ── Save budget ── */
  saveBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.saveBudgetForMonth),
      switchMap(({ monthKey, budget }) =>
        this.financeService.saveBudgetForMonth(monthKey, budget).pipe(
          map((saved) =>
            FinanceActions.saveBudgetForMonthSuccess({
              monthKey,
              budget: saved,
            }),
          ),
          catchError((error) =>
            of(
              FinanceActions.saveBudgetForMonthFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  /* ── Add expense ── */
  addExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.addExpense),
      switchMap(({ expense }) =>
        this.financeService.addExpense(expense).pipe(
          map((saved) => FinanceActions.addExpenseSuccess({ expense: saved })),
          catchError((error) =>
            of(FinanceActions.addExpenseFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  /* ── Update expense ── */
  updateExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.updateExpense),
      switchMap(({ id, changes }) => {
        console.log('updateExpense effect - id:', id, 'changes:', changes); // debug
        return this.financeService.updateExpense(id, changes).pipe(
          map((updated) =>
            FinanceActions.updateExpenseSuccess({ expense: updated }),
          ),
          catchError((error) =>
            of(FinanceActions.updateExpenseFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );

 reloadExpensesOnUpdate$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      FinanceActions.addExpenseSuccess,
      FinanceActions.updateExpenseSuccess,
      FinanceActions.deleteExpenseSuccess,
      FinanceActions.addExpensesBulkSuccess,
    ),
    withLatestFrom(this.store.select(selectSelectedMonth)),
    map(([, date]) =>
      FinanceActions.loadMonthExpenses({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      })
    ),
  )
);

reloadBudgetOnUpdate$ = createEffect(() =>
  this.actions$.pipe(
    ofType(FinanceActions.saveBudgetForMonthSuccess),
    withLatestFrom(this.store.select(selectSelectedMonth)),
    map(([, date]) => {
      const year  = date.getFullYear();
      const month = date.getMonth() + 1;
      return FinanceActions.loadBudgetForMonth({
        monthKey: `${year}-${String(month).padStart(2, '0')}`,
      });
    }),
  )
);
  /* ── Delete expense ── */
  deleteExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.deleteExpense),
      switchMap(({ id }) =>
        this.financeService.deleteExpense(id).pipe(
          map(() => FinanceActions.deleteExpenseSuccess({ id })),
          catchError((error) =>
            of(FinanceActions.deleteExpenseFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  /* ── Analyze SMS (synchronous via service, no HTTP) ── */
  analyzeSms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.analyzeSms),
      withLatestFrom(this.store.select((s: any) => s.finance.smsRawText)),
      map(([, rawText]) => {
        const transactions = this.financeService.parseSmsMessages(rawText);
        return FinanceActions.analyzeSmsSuccess({ transactions });
      }),
    ),
  );

  /* ── Import selected SMS transactions ── */
  importSelectedSms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.importSelectedSms),
      withLatestFrom(this.store.select(selectParsedTransactions)),
      switchMap(([, transactions]) => {
        const selected = transactions.filter((t) => t.selected);
        const expenses = selected.map((t) => ({
          title: t.merchant,
          amount: t.amount,
          category: t.category,
          date: t.date,
          notes: `SMS: ${t.rawText.substring(0, 100)}`,
          source: 'sms' as const,
        }));
        return this.financeService.addExpenses(expenses).pipe(
          map(() => FinanceActions.addExpensesBulkSuccess()),
          catchError((error) =>
            of(FinanceActions.addExpensesBulkFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );

  /* ── Reload month data after bulk import ── */
  reloadAfterBulkImport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.addExpensesBulkSuccess),
      withLatestFrom(this.store.select(selectSelectedMonth)),
      map(([, date]) =>
        FinanceActions.loadMonthExpenses({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
        }),
      ),
    ),
  );
  loadDebts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.loadDebts),
      switchMap(() =>
        this.financeService.getAllDebts().pipe(
          map((debts) => FinanceActions.loadDebtsSuccess({ debts })),
          catchError((error) => of(FinanceActions.loadDebtsFailure({ error: error.message })))
        )
      )
    )
  );

  addDebt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.addDebt),
      switchMap(({ debt }) =>
        this.financeService.createDebt(debt).pipe(
          map((saved) => FinanceActions.addDebtSuccess({ debt: saved })),
          catchError((error) => of(FinanceActions.addDebtFailure({ error: error.message })))
        )
      )
    )
  );

  updateDebt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.updateDebt),
      switchMap(({ id, changes }) =>
        this.financeService.updateDebt(id, changes).pipe(
          map((debt) => FinanceActions.updateDebtSuccess({ debt })),
          catchError((error) => of(FinanceActions.updateDebtFailure({ error: error.message })))
        )
      )
    )
  );

  deleteDebt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.deleteDebt),
      switchMap(({ id }) =>
        this.financeService.deleteDebt(id).pipe(
          map(() => FinanceActions.deleteDebtSuccess({ id })),
          catchError((error) => of(FinanceActions.deleteDebtFailure({ error: error.message })))
        )
      )
    )
  );

  markSettled$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.markDebtSettled),
      switchMap(({ id }) =>
        this.financeService.markDebtSettled(id).pipe(
          map((debt) => FinanceActions.markDebtSettledSuccess({ debt })),
          catchError((error) => of(FinanceActions.markDebtSettledFailure({ error: error.message })))
        )
      )
    )
  );

  recordPartial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.recordPartialPayment),
      switchMap(({ id, amount }) =>
        this.financeService.recordPartialPayment(id, amount).pipe(
          map((debt) => FinanceActions.recordPartialPaymentSuccess({ debt })),
          catchError((error) => of(FinanceActions.recordPartialPaymentFailure({ error: error.message })))
        )
      )
    )
  );

}
