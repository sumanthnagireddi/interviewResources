import { CommonModule } from '@angular/common';
import { Component, Input, inject, OnInit } from '@angular/core';
import { FirestoreDatePipe } from '../../pipes/firestore-date.pipe';
import { Store } from '@ngrx/store';
import { addTechnology } from '../../store/actions/technology.actions';
import { ContentService } from '../../services/content.service';
import { FeedItem } from '../feed/feed.component';
import { toggleStarred } from '../../store/actions/starred.actions';
import { selectIsStarred } from '../../store/selectors/starred.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.css',
})
export class FeedCardComponent implements OnInit {
  @Input() item!: any;
  private readonly store = inject(Store);
  private readonly ContentService = inject(ContentService);
  isStarred$!: Observable<boolean>;

  ngOnInit(): void {
    // Check if this item is starred
    if (this.item?.id || this.item?._id) {
      const contentId = this.item.id || this.item._id;
      this.isStarred$ = this.store.select(selectIsStarred(contentId));
    }
  }

  openArticle(item: any) {
    // navigate to article
  }

  readingTime() {
    const text: any = this.item.content;
    const wpm = 300;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  }

  editItem(item: any) {}

  deleteItem(item: any) {}

  publishItem(item: any) {}

  addToStarred(event: Event, item: any) {
    event.stopPropagation();
    const contentId = item.id || item._id;
    if (contentId) {
      this.store.dispatch(toggleStarred({ contentId }));
    }
  }

  navigateToAuthor(authorId: string) {}
}
