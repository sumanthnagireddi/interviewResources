import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../component/breadcrumb/breadcrumb.component";
import { EditorComponent } from "../../component/editor/editor.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-edit-doc',
  imports: [BreadcrumbComponent, EditorComponent],
  templateUrl: './edit-doc.component.html',
  styleUrl: './edit-doc.component.css'
})
export class EditDocComponent {
  contentId: string = '';
  content: any
  editorMode: string = 'view' // 'view' | 'edit'
  contentAvailable: boolean = true
  currentContentTopic: string = 'JavaScript';
  currentId: string = '';
  constructor(private activatedRoute: ActivatedRoute, private store: Store, private service: ContentService, private route: Router) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.currentId = params['pageId'];
      this.editorMode = params['mode'];
      this.prepareContent(this.currentId);
      const lastSegment = this.currentId.split('-').pop() ?? '';
      this.currentContentTopic =
        lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
    )
  }
  prepareContent(id: string) {
    this.service.getContent(id).subscribe({
      next: (res) => {
        if (res.content) {
          this.contentAvailable = true;
          this.content = res.content;
        } else {
          this.contentAvailable = false;
        }

        console.log('Content fetched successfully:', res);
      },
      error: (err) => {
        console.error('Error fetching content:', err);
      }
    });
  }
  handleContent(updatedContent: any) {
    this.service.addContent(updatedContent, this.currentId).subscribe({
      next: (res) => {
        this.route.navigate([`/pages/${this.currentId}/view`]);
      },
      error: (err) => {
        console.error('Error saving content:', err);
      }
    });
  }
  edit() {
    this.editorMode = 'edit';
  }

}
