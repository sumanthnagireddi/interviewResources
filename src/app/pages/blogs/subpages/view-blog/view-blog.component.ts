import { CommonModule } from '@angular/common';
import { Component, inject, resource, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../../../services/blogs.service';
import { EditorComponent } from '../../../../component/editor/editor.component';
import { Blog } from '../../../../model/blog.model';

@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [CommonModule, EditorComponent],
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly blogsService = inject(BlogsService);

  /** Route param as signal */
  readonly blogId = computed(() =>
    this.route.snapshot.paramMap.get('blogId')!
  );

  /** ✅ RESOURCE (not httpResource) */
  readonly blogResource = resource<Blog, any>({
    loader: async () => {
      const blog = await this.blogsService.getBlogById(this.blogId()).toPromise();
      return blog as Blog;
    }
  });
}
