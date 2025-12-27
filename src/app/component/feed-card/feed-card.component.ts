import { CommonModule } from '@angular/common';
import { Component, Input, inject, OnInit } from '@angular/core';
import { FirestoreDatePipe } from '../../pipes/firestore-date.pipe';
import { Store } from '@ngrx/store';
import { addTechnology } from '../../store/actions/technology.actions';
import { ContentService } from '../../services/content.service';
import { FeedItem } from '../feed/feed.component';

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
  // addToStarred(item: FeedItem) {
  //   this.ContentService.updateStarred(item.id);
  // }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.readingTime();
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

  addToStarred(item: any) {}

  navigateToAuthor(authorId: string) {}
}
