import { ContentService } from './../../services/content.service';
import { Component, inject } from '@angular/core';
import { FeedCardComponent } from "../feed-card/feed-card.component";
import { CommonModule } from '@angular/common';
import { RecentDocsComponent } from "../recent-docs/recent-docs.component";
import { Router } from '@angular/router';
export interface FeedItem {
  id: string;
  title: string;
  owner: string;
  date: string;
  content: string;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FeedCardComponent, RecentDocsComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  feed: FeedItem[] = [];
  private readonly contentService = inject(ContentService);
  private readonly router = inject(Router);

  navigateTo(item: FeedItem) {
    const contentId = item.id.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate([`/pages/${contentId}/view`]);
  }
  ngOnInit(): void {
    this.contentService.getAllContents(3).subscribe({
      next: (res) => {
        console.log('All contents fetched successfully:', res);
        this.feed = this.transformToFeed(res);
      },
      error: (err) => {
        console.error('Error fetching all contents:', err);
      }
    });
  }

  private transformToFeed(data: any[]): FeedItem[] {
    return data.map(item => ({
      id: item.id,
      title: this.getTitle(item.id),
      owner: 'Sumanth Nagireddi',
      date: this.formatDate(item.publishedAt || item.createdAt),
      content: this.extractFirstWordsFromHtml(item.content, 40)
    }));
  }
  getTitle(content: any): string {
    const lastSegment = content.split('-').pop() ?? '';
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }
  private extractFirstWordsFromHtml(
    html: string,
    wordLimit: number = 100
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
