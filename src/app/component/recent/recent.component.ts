import { Component } from '@angular/core';
import { FeedComponent } from "../feed/feed.component";
import { RecentDocsComponent } from "../recent-docs/recent-docs.component";

@Component({
  selector: 'app-recent',
  imports: [ RecentDocsComponent],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css'
})
export class RecentComponent {

}
