import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../../../store/actions/sidebar.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  sidebarToggleStatus = true;
  isServerOn = false;
  private readonly store = inject(Store);
  private readonly http = inject(HttpClient);
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
  toggleSidebar() {
    this.sidebarToggleStatus = !this.sidebarToggleStatus;
    this.store.dispatch(toggleSidebar({ show: this.sidebarToggleStatus }));
  }
  navigatoToUpTime() {
    window.open('https://stats.uptimerobot.com/Nzi1DUyGFD', '_blank');
  }
}
