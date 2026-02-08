import { Component } from '@angular/core';
import { AddBlogComponent } from "../../../../component/dialogs/add-blog/add-blog.component";

@Component({
  selector: 'app-create-blog',
  imports: [AddBlogComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {

}
