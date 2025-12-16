import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarV3Component } from "./sidebar-v3/sidebar-v3.component";
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectShowSidebar } from '../../store/selectors/sidebar.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, SidebarV3Component, RouterOutlet,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  sidebarToggleStatus = true;
  private readonly store = inject(Store);
  ngOnInit(): void {
    this.store.select(selectShowSidebar).subscribe((sidebar) => {
      console.log('sidebar status', sidebar);
      this.sidebarToggleStatus = sidebar;
    });
  }
}
