import { Component } from '@angular/core';
import { FeedCardComponent } from "../feed-card/feed-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FeedCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  feed = [
    {
      title: 'Execution Context',
      owner: 'Sumanth',
      date: 'Dec 13, 2025',
      content: 'What is Code Execution? Code execution refers to the process of running JavaScript code inside a JavaScript engine...'
    },
    {
      title: 'Hoisting in JS',
      owner: 'Sumanth',
      date: 'Dec 12, 2025',
      content: 'Hoisting is a behavior in JavaScript where variable and function declarations are moved to the top...'
    }
  ];
}
