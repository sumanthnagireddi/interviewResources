import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [SidebarComponent,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sidebarOpen = false;
  openSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }
}
