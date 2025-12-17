import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, signal, ViewChild } from '@angular/core';
import { ContentTagsComponent } from "../content-tags/content-tags.component";
import { EditorComponent } from "../editor/editor.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { ContentService } from '../../services/content.service';
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-content-layout',
  imports: [ContentTagsComponent, EditorComponent, CommonModule, BreadcrumbComponent],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentLayoutComponent {
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
        // this.route.navigate([`/pages/${this.currentId}/view`]);
      },
      error: (err) => {
        console.error('Error saving content:', err);
      }
    });
  }
  edit() {
    // this.route.navigate([`/pages/${this.currentId}/edit`]);
  }
}
