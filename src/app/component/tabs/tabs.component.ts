import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  currentTab = signal<string>('All');
  @Output() activeTabEvent = new EventEmitter<any>();
  tabNames: any[] = [
    { name: 'All', icon: 'home' },
    { name: 'Technology Content', icon: 'code' },
    { name: 'Blogs', icon: 'settings' },
  ];

  updateCurrentTab(tab: any) {
    this.currentTab.set(tab.name);
    this.activeTabEvent.emit(tab.name);
  }

}
