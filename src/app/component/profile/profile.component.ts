import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
currentTab = signal<string>('Home');
  @Output() activeTabEvent = new EventEmitter<any>()
  tabNames: string[] = ['Home', 'About', 'Following']
  updateCurrentTab(tab: string) {
    this.currentTab.set(tab);
    this.activeTabEvent.emit(tab)
  }
}
