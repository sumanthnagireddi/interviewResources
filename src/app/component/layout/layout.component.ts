import { Component, HostListener, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarV3Component } from "./sidebar-v3/sidebar-v3.component";
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectShowSidebar } from '../../store/selectors/sidebar.selectors';
import { CommonModule } from '@angular/common';
import { AddDialogComponent } from "../add-dialog/add-dialog.component";
import { combineLatest } from 'rxjs';
import { selectShowDialog } from '../../store/selectors/general.selector';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, SidebarV3Component, RouterOutlet, CommonModule, AddDialogComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  sidebarToggleStatus = true;
  dialogToggleStatus = false;
  private readonly store = inject(Store);
  ngOnInit(): void {
    combineLatest([
      this.store.select(selectShowDialog),
      this.store.select(selectShowSidebar)
    ]).subscribe(([dialog, sidebar]) => {
      this.sidebarToggleStatus = sidebar;
      this.dialogToggleStatus = dialog;
    });
  }

  // // 🔁 Listen to window resize
  // @HostListener('window:resize')
  // onResize() {
  //   this.setSidebarState();
  // }

  // // 📏 Decide based on screen width
  // private setSidebarState() {
  //   this.sidebarToggleStatus = window.innerWidth >= 768; // Tailwind md breakpoint
  // }

  handleSidebarToggle() {
    this.sidebarToggleStatus = false;
  }
}
