import { DialogActionTypes, toggleDialog } from './../../../store/actions/dialog.actions';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
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
  menuItems = [
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
        {
          id: 'Angular', label: 'Angular', icon: 'article', url: 'blogs', isOpen: false, hasItems: true, childern: [
            { id: 'ngrx', label: 'NGRX', icon: 'article', url: 'pages/12345' },
            { id: 'angular-forms', label: 'Angular Forms', icon: 'article', url: 'pages/1234wr' }
          ]
        },
        { id: 'React', label: 'React', icon: 'article', url: 'blogs' },
        { id: 'Vue', label: 'Vue', icon: 'article', url: 'blogs' }

      ]
    },
    { id: 'blogs', label: 'Blogs', icon: 'post_add', url: 'blogs' }
  ];


  folders = [
    { name: 'Technical', open: false },
    { name: 'Interview Resources', open: false },
    { name: 'AWS JS Developer training', open: false }
  ];
  // menuItems = [
  //   { id: 'for-you', label: 'For you', icon: 'account_circle', url: 'home' },
  //   { id: 'recent', label: 'Recent', icon: 'history', url: 'recent' },
  //   { id: 'starred', label: 'Starred', icon: 'star', url: 'starred' },
  //   { id: 'drafts', label: 'Drafts', icon: 'draft', url: 'drafts' },
  //   { id: 'content', label: 'Content', icon: 'bookmark_stacks',hasItems:true },
  //   { id: 'blogs', label: 'Blogs', icon: 'post_add' }
  // ];

  // selectedMenuItem: string = 'for-you'; // Default selected item

  selectedMenuItem: string | null = null;

  selectMenuItem(event: Event, item: MenuItem) {
    event.stopPropagation();
    this.selectedMenuItem = item.id;

    if (item.hasItems) {
      item.isOpen = !item.isOpen;
    }
  }
  addTechnology(event: Event, item: MenuItem) {
    event.stopPropagation();
    this.store.dispatch(toggleDialog({ show: true }));
  }

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
