import { Component, HostListener, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarV3Component } from './sidebar-v3/sidebar-v3.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectShowSidebar } from '../../store/selectors/sidebar.selectors';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import {
  selectDialogConfig,
  selectDialogOpen,
} from '../../store/selectors/general.selector';
import { DialogConfig, DialogType } from '../../model/dialog.model';
import { AddTopicDialogComponent } from '../dialogs/add-topic-dialog/add-topic-dialog.component';
import { DeleteTechDialogComponent } from '../dialogs/delete-tech-dialog/delete-tech-dialog.component';
import { DeleteTopicDialogComponent } from '../dialogs/delete-topic-dialog/delete-topic-dialog.component';
import { EditTechDialogComponent } from "../dialogs/edit-tech-dialog/edit-tech-dialog.component";
import { AddDialogComponent } from "../dialogs/add-dialog/add-dialog.component";

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    SidebarV3Component,
    RouterOutlet,
    CommonModule,
    AddDialogComponent,
    AddTopicDialogComponent,
    DeleteTechDialogComponent,
    DeleteTopicDialogComponent,
    EditTechDialogComponent,
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  sidebarToggleStatus = true;
  isDialogOpen: boolean = false;
  dialogConfig: DialogConfig | null = null;
  DialogType=DialogType
  private readonly store = inject(Store);
  ngOnInit(): void {
    combineLatest([
      this.store.select(selectDialogOpen),
      this.store.select(selectDialogConfig),
      this.store.select(selectShowSidebar),
    ]).subscribe(([isDialogOpen, dialogConfig, sidebar]) => {
      this.sidebarToggleStatus = sidebar;
      this.isDialogOpen = isDialogOpen;
      this.dialogConfig = dialogConfig;
      console.log(this.isDialogOpen, this.dialogConfig);
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
