import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { TechnologyService } from '../../services/technology.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  blogs: any = [{}, {}, {}];
  private readonly techService = inject(TechnologyService);
  currentTab = signal<string>('All');
  @Output() activeTabEvent = new EventEmitter<any>();
  tabNames: any[] = ['All'];
    ngOnInit(): void {

      this.techService.getTechnologiesFromMongo().subscribe((data: any) => {
        this.tabNames = [{ name: 'All' }, ...data];
      });
    }
    updateCurrentTab(tab: any) {
      this.currentTab.set(tab.name);
      this.activeTabEvent.emit(tab.name);
    }
  }
