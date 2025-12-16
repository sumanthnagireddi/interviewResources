import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, signal, ViewChild } from '@angular/core';
import { ContentTagsComponent } from "../content-tags/content-tags.component";
import { EditorComponent } from "../../../../components/editor/editor.component";
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-content-layout',
  imports: [ContentTagsComponent, EditorComponent, NgIf],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentLayoutComponent {
  contentId: string = '';
  content = signal<any>('');
  isContentLoaded = signal(false);
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      this.contentId = params['pageId'];
      console.log(this.contentId,'content id');
      this.isContentLoaded.set(false);
      this.prepareContent(this.contentId);
    }
    )
  }
  prepareContent(id: string) {
    this.isContentLoaded.set(false);
    if (id === '12345') {
      this.isContentLoaded.set(true);
      this.content.set(`<h1>NGRX State Management in Angular</h1>`)
    } else {
      this.isContentLoaded.set(true);
      this.content.set(`<h1>Angular Forms: A Comprehensive Guide</h1>`)
    }
  }

}
