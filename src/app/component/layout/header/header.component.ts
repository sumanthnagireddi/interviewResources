import { Component, inject, OnInit, HostListener, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../../../store/actions/sidebar.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService, AccentColor, ACCENT_COLORS, ThemeMode } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  sidebarToggleStatus = false;
  isServerOn = false;
  showThemePopover = false;

  private readonly store = inject(Store);
  private readonly http = inject(HttpClient);
  readonly themeService = inject(ThemeService);
  private readonly elementRef = inject(ElementRef);

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
    }
  }

  toggleSidebar(): void {
    this.sidebarToggleStatus = !this.sidebarToggleStatus;
    this.store.dispatch(toggleSidebar({ show: this.sidebarToggleStatus }));
  }

  toggleThemePopover(event: MouseEvent): void {
    event.stopPropagation();
    this.showThemePopover = !this.showThemePopover;
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
}
