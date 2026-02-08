import { Component } from '@angular/core';
import { RecentBlogsComponent } from "../../components/recent-blogs/recent-blogs.component";
import { AllBlogsComponent } from "../../components/all-blogs/all-blogs.component";

@Component({
  selector: 'app-blogs-home',
  imports: [RecentBlogsComponent, AllBlogsComponent],
  templateUrl: './blogs-home.component.html',
  styleUrl: './blogs-home.component.css'
})
export class BlogsHomeComponent {

}
