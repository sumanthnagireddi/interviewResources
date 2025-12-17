import { DialogActionTypes, toggleDialog } from './../../../store/actions/dialog.actions';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTechnologies } from '../../../store/selectors/technology.selector';
import { getTechnologies } from '../../../store/actions/technology.actions';
import { Technology, } from '../../../model/content.model';
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  url?: string;
  hasItems?: boolean;
  isOpen?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar-v3',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-v3.component.html',
  styleUrl: './sidebar-v3.component.css'
})
export class SidebarV3Component {
  private readonly store = inject(Store);
  menuItems: MenuItem[] = [
    { id: 'for-you', label: 'For you', icon: 'account_circle', url: 'home' },
    { id: 'recent', label: 'Recent', icon: 'history', url: 'recent' },
    { id: 'starred', label: 'Starred', icon: 'star', url: 'starred' },
    { id: 'drafts', label: 'Drafts', icon: 'draft', url: 'drafts' },
    {
      id: 'content',
      label: 'Content',
      icon: 'bookmark_stacks',
      hasItems: true,
      isOpen: false,
      children: [
      ]
    },
    { id: 'blogs', label: 'Blogs', icon: 'post_add', url: 'blogs' }
  ];


  folders = [
    { name: 'Technical', open: false },
    { name: 'Interview Resources', open: false },
    { name: 'AWS JS Developer training', open: false }
  ];

  selectedMenuItem: string | null = null;
  ngOnInit(): void {
    this.store.dispatch(getTechnologies());
    this.store.select(selectTechnologies).subscribe(technologies => {
      this.updateContentChildren(technologies);
    });
  }
  selectMenuItem(event: Event, item: MenuItem) {
    event.stopPropagation();
    this.selectedMenuItem = item.id;

    if (item.hasItems) {
      item.isOpen = !item.isOpen;
    }
  }
  addTechnology(event: Event, item: MenuItem) {
    event.stopPropagation();
    this.store.dispatch(toggleDialog({ show: true, level: 'technologies' }));
  }
  updateContentChildren(technologies: Technology[]) {
    const contentNode = this.menuItems.find(i => i.id === 'content');
    if (contentNode) {
      contentNode.children = technologies.map(tech => ({
        id: tech.id,
        label: tech.name,
        icon: 'article',
        url: `/pages/${tech.id}-${tech.name.replace(/\s+/g, '-').toLowerCase()}/view`,
        hasItems: false
      }));
    }
  }

  // getTopicsForTechnology(technologyId: string): MenuItem[] {
  //   let topics: Topic[] = [];

  //   this.store.select(selectTopicsByTechnology(technologyId))
  //     .subscribe(t => topics = t)
  //     .unsubscribe(); // ⚠️ IMPORTANT: Unsubscribe immediately to avoid memory leaks
  //   return topics.map(topic => ({
  //     id: topic.id,
  //     label: topic.name,
  //     icon: 'article',
  //     url: `/pages/${topic.id}`,
  //     hasItems: false
  //   }));
  // }


  /** Click on row */
  onItemClick(item: MenuItem) {
    this.selectedMenuItem = item.id;

    // Navigate only if no children
    if (!item.hasItems && item.url) {
      // router handles navigation via routerLink
    }
  }

  /** Toggle only from arrow */
  toggleOpen(event: Event, item: MenuItem) {
    event.stopPropagation();
    item.isOpen = !item.isOpen;
  }


}
