import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FirestoreDatePipe } from '../../pipes/firestore-date.pipe';

@Component({
  selector: 'app-feed-card',
  imports: [CommonModule,FirestoreDatePipe],
  standalone: true,
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.css'
})
export class FeedCardComponent {
  @Input() item: any;
}
