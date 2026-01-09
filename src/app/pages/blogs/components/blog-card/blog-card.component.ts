import { Component, Input } from '@angular/core';
import { Blog } from '../../../../model/blog.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {
  @Input() blog!: Blog;
}
