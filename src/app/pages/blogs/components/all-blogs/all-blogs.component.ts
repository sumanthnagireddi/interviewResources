import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { TechnologyService } from '../../../../services/technology.service';
import { BlogsService } from '../../../../services/blogs.service';
import { Blog } from '../../../../model/blog.model';
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { TabsComponent } from "../../../../component/tabs/tabs.component";
import { SkeletonComponent } from "../../../../component/skeleton/skeleton.component";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-all-blogs',
  imports: [CommonModule, BlogCardComponent, TabsComponent, SkeletonComponent],
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.css'
})
export class AllBlogsComponent {
  blogs: Blog[] = [];
  private readonly techService = inject(TechnologyService);
  private readonly blogService = inject(BlogsService);
  currentTab = signal<string>('All');
  isLoading = signal(true);
  @Output() activeTabEvent = new EventEmitter<any>();
  tabNames: any[] = ['All'];

  ngOnInit(): void {
    forkJoin({
      blogs: this.blogService.getBlogsFromMongo(),
      technologies: this.techService.getTechnologiesFromMongo()
    }).subscribe({
      next: ({ blogs, technologies }: any) => {
        this.blogs = blogs;
        this.tabNames = [{ name: 'All' }, ...technologies];
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  updateCurrentTab(tab: any) {
    this.currentTab.set(tab.name);
    this.activeTabEvent.emit(tab.name);
  }
}
