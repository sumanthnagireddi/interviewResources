import { Component, inject, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../../../store/actions/sidebar.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService, AccentColor, ACCENT_COLORS, ThemeMode } from '../../../services/theme.service';
import { GlobalSearchComponent } from '../../global-search/global-search.component';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  icon: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, GlobalSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @ViewChild(GlobalSearchComponent) globalSearch!: GlobalSearchComponent;

  sidebarToggleStatus = false;
  isServerOn = false;
  showThemePopover = false;
  showNotificationsPopover = false;
  showAppsPopover = false;

  // Personal projects/apps - Add more apps here in the future
  readonly personalApps = [
    {
      name: 'Portfolio',
      url: 'https://sumanthnagireddi1.web.app',
      image: 'https://sumanthnagireddi1.web.app/assets/imag3.jpg',
      description: 'My personal portfolio website',
    }
  ];

  private readonly store = inject(Store);
  private readonly http = inject(HttpClient);
  readonly themeService = inject(ThemeService);
  private readonly elementRef = inject(ElementRef);

  // Sample notifications - replace with actual service data
  notifications: Notification[] = [
    {
      id: '1',
      title: 'New content added',
      message: 'Angular 19 features documentation has been published',
      time: '5 min ago',
      read: false,
      type: 'info',
      icon: 'article'
    },
    {
      id: '2',
      title: 'Build successful',
      message: 'Your latest deployment completed successfully',
      time: '1 hour ago',
      read: false,
      type: 'success',
      icon: 'check_circle'
    },
    {
      id: '3',
      title: 'New comment',
      message: 'Someone commented on your blog post',
      time: '2 hours ago',
      read: true,
      type: 'info',
      icon: 'chat_bubble'
    }
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Theme options
  readonly accentColors = ACCENT_COLORS;
  readonly themeModes: { label: string; value: ThemeMode; icon: string }[] = [
    { label: 'Light', value: 'light', icon: 'light_mode' },
    { label: 'Dark', value: 'dark', icon: 'dark_mode' },
    { label: 'System', value: 'system', icon: 'contrast' }
  ];

  ngOnInit(): void {
    this.http
      .get<{ status: boolean }>(`${environment.API_URL}/health`)
      .subscribe({
        next: (data) => {
          this.isServerOn = data ? true : false;
        },
        error: () => {
          this.isServerOn = false;
        },
      });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showThemePopover = false;
      this.showNotificationsPopover = false;
      this.showAppsPopover = false;
    }
  }

  toggleAppsPopover(event: MouseEvent): void {
    event.stopPropagation();
    this.showAppsPopover = !this.showAppsPopover;
    this.showThemePopover = false;
    this.showNotificationsPopover = false;
  }

  toggleSidebar(): void {
    this.sidebarToggleStatus = !this.sidebarToggleStatus;
    this.store.dispatch(toggleSidebar({ show: this.sidebarToggleStatus }));
  }



  toggleThemePopover(event: MouseEvent): void {
    event.stopPropagation();
    this.showThemePopover = !this.showThemePopover;
    this.showNotificationsPopover = false;
    this.showAppsPopover = false;
  }

  toggleNotificationsPopover(event: MouseEvent): void {
    event.stopPropagation();
    this.showNotificationsPopover = !this.showNotificationsPopover;
    this.showThemePopover = false;
    this.showAppsPopover = false;
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  removeNotification(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  clearAllNotifications(): void {
    this.notifications = [];
  }

  setThemeMode(mode: ThemeMode): void {
    this.themeService.setThemeMode(mode);
  }

  setAccentColor(color: AccentColor): void {
    this.themeService.setAccentColor(color);
  }

  navigatoToUpTime(): void {
    window.open('https://stats.uptimerobot.com/Nzi1DUyGFD', '_blank');
  }

  openGlobalSearch(): void {
    this.globalSearch?.openSearch();
  }
}
