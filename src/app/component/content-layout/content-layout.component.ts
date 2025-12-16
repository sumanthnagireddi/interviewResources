import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, signal, ViewChild } from '@angular/core';
import { ContentTagsComponent } from "../content-tags/content-tags.component";
import { EditorComponent } from "../editor/editor.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-content-layout',
  imports: [ContentTagsComponent, EditorComponent, CommonModule],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentLayoutComponent {
  contentId: string = '';
  content: any
  editorMode: string = 'view' // 'view' | 'edit'
  constructor(private activatedRoute: ActivatedRoute, private store: Store) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.prepareContent(params['pageId']);
    }
    )
  }
  prepareContent(id: string) {
    console.log('Content ID:', id);
    this.editorMode = 'edit';
    this.content = `<h1>Content for ID: ${id}</h1><p>This is some sample content for the content ID ${id}.</p>`;
  }

}
