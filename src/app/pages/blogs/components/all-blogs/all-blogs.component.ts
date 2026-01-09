import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { TechnologyService } from '../../../../services/technology.service';
import { BlogsService } from '../../../../services/blogs.service';
import { Blog } from '../../../../model/blog.model';
import { RouterLink } from "@angular/router";
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { TagsComponent } from "../../subpages/tags/tags.component";
import { TabsComponent } from "../../../../component/tabs/tabs.component";
@Component({
  selector: 'app-all-blogs',
  imports: [CommonModule, RouterLink, BlogCardComponent, TagsComponent, TabsComponent],
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.css'
})
export class AllBlogsComponent {
  blogs: Blog[] = [];
  private readonly techService = inject(TechnologyService);
  private readonly blogService = inject(BlogsService);
  currentTab = signal<string>('All');
  @Output() activeTabEvent = new EventEmitter<any>();
  tabNames: any[] = ['All'];
  ngOnInit(): void {
    this.blogService.getBlogsFromMongo().subscribe((data: any) => {
      this.blogs = data
    });
    this.techService.getTechnologiesFromMongo().subscribe((data: any) => {
      this.tabNames = [{ name: 'All' }, ...data];
    });
  }
  updateCurrentTab(tab: any) {
    this.currentTab.set(tab.name);
    this.activeTabEvent.emit(tab.name);
  }

}
