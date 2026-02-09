import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Blog } from '../../../../model/blog.model';
import { BlogsService } from '../../../../services/blogs.service';
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { SkeletonComponent } from "../../../../component/skeleton/skeleton.component";

@Component({
  selector: 'app-recent-blogs',
  imports: [CommonModule, RouterLink, BlogCardComponent, SkeletonComponent],
  templateUrl: './recent-blogs.component.html',
  styleUrl: './recent-blogs.component.css'
})
export class RecentBlogsComponent {
  blogs: Blog[] = [];
  isLoading = signal(true);
  private readonly blogService = inject(BlogsService);

  ngOnInit(): void {
    this.blogService.getBlogsFromMongo().subscribe({
      next: (data: any) => {
        this.blogs = data;
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
