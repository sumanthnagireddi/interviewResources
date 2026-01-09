import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Blog } from '../../../../model/blog.model';
import { BlogsService } from '../../../../services/blogs.service';
import { BlogCardComponent } from "../blog-card/blog-card.component";

@Component({
  selector: 'app-recent-blogs',
  imports: [CommonModule, RouterLink, BlogCardComponent],
  templateUrl: './recent-blogs.component.html',
  styleUrl: './recent-blogs.component.css'
})
export class RecentBlogsComponent {
  blogs: Blog[] = [];
  private readonly blogService = inject(BlogsService);

  ngOnInit(): void {
    this.blogService.getBlogsFromMongo().subscribe((data: any) => {
      this.blogs = data
    });
  }
}
