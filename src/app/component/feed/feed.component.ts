import { ContentService } from './../../services/content.service';
import { Component, inject, OnInit } from '@angular/core';
import { FeedCardComponent } from "../feed-card/feed-card.component";
import { CommonModule } from '@angular/common';
import { RecentDocsComponent } from "../recent-docs/recent-docs.component";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRecentContents, selectTopContents } from '../../store/selectors/content.selector';
import { combineLatest } from 'rxjs';
import { loadRecentVisited, loadTopContents } from '../../store/actions/content.actions';
import { Timestamp } from '@angular/fire/firestore';
export interface FeedItem {
  id: string;
  title: string;
  owner: string;
  date: string;
  content: string;
  lastViewed: Timestamp,
  updatedOn: Timestamp
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FeedCardComponent, RecentDocsComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  feed: FeedItem[] = [];
  recentContent: any
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  navigateTo(item: any) {
    this.router.navigate([`/pages/${item.topicId}`]);
  }
  constructor() {
    this.store.dispatch(loadTopContents());
    this.store.dispatch(loadRecentVisited())
  }
  ngOnInit(): void {

    combineLatest([
      this.store.select(selectTopContents),
      this.store.select(selectRecentContents)
    ]).subscribe({
      next: ([topContents, recentContents]) => {
        console.log('All contents fetched successfully:', topContents, recentContents);
        this.feed =topContents
        this.recentContent = topContents
      },
      error: (err) => {
        console.error('Error fetching all contents:', err);
      }
    });
  }

 Title(content: any): string {
    const lastSegment = content?.split('-').pop() ?? '';
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }
  private extractFirstWordsFromHtml(
    html: string,
    wordLimit = 100
  ): string {
    if (!html) return '';

    // 1️⃣ Remove HTML tags
    const plainText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    // 2️⃣ Split into words
    const words = plainText.split(' ');

    // 3️⃣ Take first N words
    const excerpt = words.slice(0, wordLimit).join(' ');

    // 4️⃣ Append ellipsis if truncated
    return words.length > wordLimit ? `${excerpt}...` : excerpt;
  }

  private formatDate(timestamp: any): string {
    if (!timestamp) return '';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }

}
