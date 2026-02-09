import { openDialog } from './../../../store/actions/dialog.actions';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTechnologies } from '../../../store/selectors/technology.selector';
import {
  getTechnologies,
  getTopics,
} from '../../../store/actions/technology.actions';
import { Technology } from '../../../model/content.model';
import { ProfileCardComponent } from '../../profile-card/profile-card.component';
import { DialogType } from '../../../model/dialog.model';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from '../../../services/theme.service';

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
  styleUrl: './sidebar-v3.component.css',
})
export class SidebarV3Component implements OnInit {
  private readonly store = inject(Store);
  readonly themeService = inject(ThemeService);
  isContentLoading = signal(true);
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
      isOpen: true,
      children: [],
    },
    {
      id: 'blogs',
      label: 'Blogs',
      icon: 'post_add',
      hasItems: false,
      url: 'blogs',
    },
    {
      id: 'sumanth',
      label: 'Sumanth Nagireddi',
      icon: 'profile',
      url: 'profile',
    },
  ];

  folders = [
    { name: 'Technical', open: false },
    { name: 'Interview Resources', open: false },
    { name: 'AWS JS Developer training', open: false },
  ];

  selectedMenuItem: string | null = null;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(getTechnologies());
    this.store.select(selectTechnologies).subscribe((technologies) => {
      this.updateContentChildren(technologies);
      this.syncMenuWithRoute();
      if (technologies && technologies.length > 0) {
        this.isContentLoading.set(false);
      }
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.syncMenuWithRoute();
      });
  }
  private syncMenuWithRoute() {
    const currentUrl = this.router.url;

    this.menuItems.forEach((item) => {
      // Reset
      item.isOpen = true;

      // Simple route match
      if (item.url && currentUrl.includes(item.url)) {
        this.selectedMenuItem = item.id;
      }

      // Handle nested content (technologies/topics)
      if (item.children?.length) {
        item.children.forEach((child) => {
          if (currentUrl.includes(child.id)) {
            item.isOpen = true; // open Content
            this.selectedMenuItem = child.id;

            // Open topic parent
            child.isOpen = true;
          }
        });
      }
    });
  }

  selectMenuItem(event: Event, item: MenuItem) {
    event.stopPropagation();
    this.selectedMenuItem = item.id;
    this.store.dispatch(getTopics({ technologyId: this.selectedMenuItem }));
    if (item.hasItems) {
      item.isOpen = !item.isOpen;
    }
    // this.toggleChildOpen(event, item);
  }
  updateContentChildren(technologies: Technology[]) {
    const contentNode = this.menuItems.find((i) => i.id === 'content');
    if (contentNode) {
      contentNode.children = technologies.map((tech) => ({
        id: tech._id,
        label: tech.name,
        icon: 'article',
        description: tech?.description,
        hasItems: true,
        isOpen:
          this.updateTechnologyChildren(tech.topics)?.length > 0 ? true : false,
        children: this.updateTechnologyChildren(tech.topics) || [],
      }));
    }
  }
  updateTechnologyChildren(topics?: any[]): MenuItem[] {
    if (!topics || topics.length === 0) {
      return [];
    }

    return topics.map((topic) => ({
      id: topic._id,
      label: topic.name,
      icon: 'description',
      hasItems: false,
      topic_description: topic.topic_description,
    }));
  }

  addTechnology(event: Event, item: MenuItem) {
    event.stopPropagation();
    if (item.url == 'blogs') {
      this.store.dispatch(
        openDialog({
          config: {
            type: DialogType.ADD_BLOG,
          },
        })
      );
    } else {
      this.store.dispatch(
        openDialog({
          config: {
            type: DialogType.ADD_TECH,
          },
        })
      );
    }
  }

  addChildTechnology(event: Event, tech: any) {
    event.stopPropagation();
    this.store.dispatch(
      openDialog({
        config: {
          type: DialogType.ADD_TOPIC,
          payload: { technologyId: tech },
        },
      })
    );
  }
  editChild(event: Event, child: any) {
    event.stopPropagation();
    this.store.dispatch(
      openDialog({
        config: {
          type: DialogType.EDIT_TOPIC,
          payload: { technologyId: child },
        },
      })
    );
  }
  editTechnology(event: Event, child: any) {
    event.stopPropagation();
    this.store.dispatch(
      openDialog({
        config: {
          type: DialogType.EDIT_TECH,
          payload: { technologyId: child },
        },
      })
    );
  }
  deleteChildMenu(event: Event, child: any) {
    event.stopPropagation();
    this.store.dispatch(
      openDialog({
        config: {
          type: DialogType.DELETE_TOPIC,
          payload: { technologyId: child },
        },
      })
    );
  }
  deleteTechnology(event: Event, child: any) {
    event.stopPropagation();
    this.store.dispatch(
      openDialog({
        config: {
          type: DialogType.DELETE_TECH,
          payload: { technologyId: child },
        },
      })
    );
  }
  toggleChildOpen(event: Event, child: any) {
    event.stopPropagation();
    child.isOpen = !child.isOpen;
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
