import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../../../store/actions/sidebar.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  sidebarToggleStatus = true;
  isServerOn: boolean = false;
  private readonly store = inject(Store);
  private readonly http = inject(HttpClient);
  ngOnInit(): void {
    const startTime = performance.now();
    this.http
      .get<{ status: boolean }>(`${environment.API_URL}/health`)
      .subscribe({
        next: (data) => {
          const endTime = performance.now();
          const responseTimeMs = endTime - startTime;
          if (data?.status) {
            this.isServerOn = true;
            if (responseTimeMs < 300) {
              this.isServerOn = true;
            } else {
              this.isServerOn = false;
            }
          }
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
}
