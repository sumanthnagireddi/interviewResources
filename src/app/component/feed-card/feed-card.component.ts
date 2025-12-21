import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FirestoreDatePipe } from '../../pipes/firestore-date.pipe';
import { Store } from '@ngrx/store';
import { addTechnology } from '../../store/actions/technology.actions';
import { ContentService } from '../../services/content.service';
import { FeedItem } from '../feed/feed.component';

@Component({
  selector: 'app-feed-card',
  imports: [CommonModule, FirestoreDatePipe],
  standalone: true,
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.css'
})
export class FeedCardComponent {
  @Input() item!: FeedItem;
  private readonly store = inject(Store);
  private readonly ContentService = inject(ContentService)
  addToStarred(item: FeedItem) {
    this.ContentService.updateStarred(item.id)
  }
}
