import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FirestoreDatePipe } from '../../pipes/firestore-date.pipe';
import { FeedItem } from '../feed/feed.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-docs',
  standalone: true,
  imports: [CommonModule, FirestoreDatePipe],
  templateUrl: './recent-docs.component.html',
  styleUrls: ['./recent-docs.component.css']
})
export class RecentDocsComponent {
  @Input() docs: any
  private readonly router = inject(Router)
  ngOnInit(): void {
    console.log("d", this.docs)
  }
  navigateTo(item: FeedItem) {
    const contentId = item.id.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate([`/pages/${contentId}/view`]);
  }
}
