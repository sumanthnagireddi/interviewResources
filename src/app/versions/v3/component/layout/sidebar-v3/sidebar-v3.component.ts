import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-v3',
  imports: [],
  templateUrl: './sidebar-v3.component.html',
  styleUrl: './sidebar-v3.component.css'
})
export class SidebarV3Component {
  folders = [
    { name: 'Technical', open: false },
    { name: 'Interview Resources', open: false },
    { name: 'AWS JS Developer training', open: false }
  ];
}
