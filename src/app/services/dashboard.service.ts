import { Injectable, inject } from '@angular/core';
import { SnippetsService } from './snippets.service';
import { FinanceService } from './finance.service';
import { StarredService } from './starred.service';

export interface ActivityItem {
  id: string;
  type: 'content' | 'snippet' | 'blog' | 'starred' | 'finance';
  action: string;
  title: string;
  timestamp: string;
  icon: string;
  color: string;
}

const ACTIVITY_LOG_KEY = 'dashboard_activity_log';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly snippetsService = inject(SnippetsService);
  private readonly financeService = inject(FinanceService);
  private readonly starredService = inject(StarredService);

  // ──── Finance helpers ────

  getCurrentMonthSummary() {
    const now = new Date();
    return this.financeService.getMonthSummary(now.getFullYear(), now.getMonth() + 1);
  }

  getCurrentMonthExpenses() {
    const now = new Date();
    return this.financeService.getExpensesForMonth(now.getFullYear(), now.getMonth() + 1);
  }

  // ──── Snippet helpers ────

  getSnippetStats() {
    const snippets = this.snippetsService.getSnippets();
    const langSet = new Set(snippets.map(s => s.language));
    const tagSet = new Set<string>();
    snippets.forEach(s => s.tags.forEach(t => tagSet.add(t)));
    return {
      total: snippets.length,
      favorites: snippets.filter(s => s.isFavorite).length,
      languages: langSet.size,
      tags: tagSet.size,
    };
  }

  getSnippetsByLanguage() {
    return this.snippetsService.languageBreakdown();
  }

  getRecentSnippets(count: number) {
    return this.snippetsService.getRecentSnippets(count);
  }

  // ──── Starred helpers ────

  getStarredCount(): number {
    return this.starredService.getStarredIds().length;
  }

  // ──── Activity log ────

  logActivity(item: Omit<ActivityItem, 'id' | 'timestamp'>): void {
    const log = this.getActivityLog();
    log.unshift({
      ...item,
      id: crypto.randomUUID?.() || Date.now().toString(),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(log.slice(0, 50)));
  }

  getActivityLog(): ActivityItem[] {
    try {
      const raw = localStorage.getItem(ACTIVITY_LOG_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  clearActivityLog(): void {
    localStorage.removeItem(ACTIVITY_LOG_KEY);
  }
}
