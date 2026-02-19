import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, catchError, of } from 'rxjs';
import { DashboardService, ActivityItem } from '../../services/dashboard.service';
import { SnippetsService } from '../../services/snippets.service';
import { BlogsService } from '../../services/blogs.service';
import { selectTechnologies } from '../../store/selectors/technology.selector';
import { selectStarredCount } from '../../store/selectors/starred.selector';
import { selectTopContents, selectRecentContents } from '../../store/selectors/content.selector';
import { getTechnologies } from '../../store/actions/technology.actions';
import { loadTopContents, loadRecentVisited } from '../../store/actions/content.actions';
import { Technology } from '../../model/content.model';
import { CodeSnippet, LanguageConfig } from '../../model/snippet.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly snippetsService = inject(SnippetsService);
  private readonly blogsService = inject(BlogsService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  // NgRx-driven data
  technologies = signal<Technology[]>([]);
  topContents = signal<any[]>([]);
  recentContents = signal<any[]>([]);
  starredCount = signal(0);

  blogsCount = signal(0);

  // Service-driven data
  snippetStats = signal({ total: 0, favorites: 0, languages: 0, tags: 0 });
  financeSummary = signal({ totalSpent: 0, budget: 0, remaining: 0, percentUsed: 0, month: '', categoryBreakdown: [] as any[] });
  snippetsByLanguage = signal<{ language: string; count: number; config: LanguageConfig }[]>([]);
  recentSnippets = signal<CodeSnippet[]>([]);
  activityLog = signal<ActivityItem[]>([]);

  totalTopics = signal(0);
  isLoading = signal(true);

  greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  ngOnInit(): void {
    // Dispatch store actions
    this.store.dispatch(getTechnologies());
    this.store.dispatch(loadTopContents());
    this.store.dispatch(loadRecentVisited());

    // Technologies
    this.store.select(selectTechnologies).subscribe(techs => {
      this.technologies.set(techs);
      const topicCount = techs.reduce((sum: number, t: any) => sum + (t.topics?.length || 0), 0);
      this.totalTopics.set(topicCount);
      this.isLoading.set(false);
    });

    // Content
    this.store.select(selectTopContents).subscribe(c => this.topContents.set(c));
    this.store.select(selectRecentContents).subscribe(c => this.recentContents.set(c));

    // Starred
    this.store.select(selectStarredCount).subscribe(c => this.starredCount.set(c));

    // Snippet stats
    this.snippetStats.set(this.dashboardService.getSnippetStats());
    this.snippetsByLanguage.set(this.dashboardService.getSnippetsByLanguage());
    this.recentSnippets.set(this.dashboardService.getRecentSnippets(5));

    // Finance
    const summary = this.dashboardService.getCurrentMonthSummary();
    // this.financeSummary.set(summary);

    // Blogs
    this.blogsService.getBlogsFromMongo().pipe(
      map((blogs: any) => blogs?.length || 0),
      catchError(() => of(0))
    ).subscribe(count => this.blogsCount.set(count));

    // Activity log
    this.activityLog.set(this.dashboardService.getActivityLog());
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  getTimeAgo(timestamp: string): string {
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const diff = now - then;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getProgressColor(pct: number): string {
    if (pct >= 100) return 'bg-red-500';
    if (pct >= 80) return 'bg-amber-500';
    return 'bg-accent';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(amount);
  }
}
