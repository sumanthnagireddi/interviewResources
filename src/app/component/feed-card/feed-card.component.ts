import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feed-card',
  imports: [],
  standalone: true,
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.css'
})
export class FeedCardComponent {
  @Input() item: any;
}
