import { Component, output } from '@angular/core';

@Component({
  selector: 'app-collapse-icon',
  imports: [],
  templateUrl: './collapse-icon.component.html',
  styleUrl: './collapse-icon.component.css'
})
export class CollapseIconComponent {
  sidebarState = output<boolean>()

  showSidebar() {
    console.log('clicked')
    this.sidebarState.emit(true);
  }
}
