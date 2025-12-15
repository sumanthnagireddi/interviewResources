import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-docs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-docs.component.html',
  styleUrls: ['./recent-docs.component.css']
})
export class RecentDocsComponent {
  docs = [
    { title: 'Execution Context', owner: 'Sumanth', time: 'Visited 15 minutes ago' },
    { title: 'Untitled', owner: 'Sumanth', time: 'Visited 20 minutes ago', draft: true },
    { title: 'Hoisting in JS', owner: 'Sumanth', time: 'Visited December 13, 2025' },
    { title: 'How JavaScript code Executes...', owner: 'Sumanth', time: 'Visited December 12, 2025' },
    { title: 'How Web works', owner: 'Sumanth', time: 'Visited December 12, 2025' },
    { title: 'How Functions works in JS', owner: 'Sumanth', time: 'Visited December 12, 2025' }
  ];
}
