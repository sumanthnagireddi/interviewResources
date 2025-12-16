import { Component } from '@angular/core';
import { HeaderComponent } from './component/layout/header/header.component';
import { LayoutComponent } from "./component/layout/layout.component";

@Component({
  selector: 'app-v3',
  imports: [HeaderComponent, LayoutComponent],
  templateUrl: './v3.component.html',
  styleUrl: './v3.component.css'
})
export class V3Component {

}
