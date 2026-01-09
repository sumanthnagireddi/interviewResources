import { Component } from '@angular/core';
import { RecentDocsComponent } from '../../component/recent-docs/recent-docs.component';
import { TabsComponent } from "../../component/tabs/tabs.component";

@Component({
  selector: 'app-recent',
  imports: [RecentDocsComponent, TabsComponent],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css'
})
export class RecentComponent {

}
