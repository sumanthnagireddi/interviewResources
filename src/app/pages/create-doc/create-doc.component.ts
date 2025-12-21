import { Component } from '@angular/core';
import { EditorComponent } from "../../component/editor/editor.component";
import { BreadcrumbComponent } from "../../component/breadcrumb/breadcrumb.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-create-doc',
  imports: [EditorComponent, BreadcrumbComponent, CommonModule],
  templateUrl: './create-doc.component.html',
  styleUrl: './create-doc.component.css'
})
export class CreateDocComponent {
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
      const lastSegment = this.currentId.split('-').pop() ?? '';
      this.currentContentTopic =
        lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
    )
  }
  handleContent(updatedContent: any) {
    this.service.addContent(updatedContent, this.currentId,this.currentContentTopic).subscribe({
      next: (res) => {
        this.route.navigate([`/pages/${this.currentId}/view`]);
      },
      error: (err) => {
        console.error('Error saving content:', err);
      }
    });
  }
}
