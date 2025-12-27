import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  signal,
  ViewChild,
  OnInit,
} from '@angular/core';
// import { ContentTagsComponent } from "../content-tags/content-tags.component";
// import { EditorComponent } from "../editor/editor.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { ContentService } from '../../services/content.service';
import { ContentTagsComponent } from '../../component/content-tags/content-tags.component';
import { EditorComponent } from '../../component/editor/editor.component';
import { BreadcrumbComponent } from '../../component/breadcrumb/breadcrumb.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { catchError, delay, finalize, throwError } from 'rxjs';
// import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-content-layout',
  imports: [
    EditorComponent,
    CommonModule,
    BreadcrumbComponent,
    RouterLink,
    LoaderComponent,
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentLayoutComponent implements OnInit {
  contentAvailable = true;
  currentId = '';
  content: any;
  currentTechnology!: string;
  contentLoader: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private service: ContentService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.currentId = params['pageId'];
      this.getContent(this.currentId);
      // this.service.updateLastViewed(this.currentId);
    });
  }
  getContent(id: string): void {
    this.contentLoader = true;
    this.contentAvailable = false;

    this.service
      .fetchContent(id)
      .pipe(
        delay(300),
        catchError((err) => throwError(() => err).pipe(delay(500)))
      )
      .subscribe({
        next: (data: any) => {
          this.content = data?.body ?? null;
          this.contentAvailable = !!this.content;
          this.contentLoader = false;
        },
        error: () => {
          setTimeout(() => {
            this.content = null;
            this.contentAvailable = false;
            this.contentLoader = false;
          }, 300);
        },
      });
  }

  edit() {
    this.route.navigate([`/edit/${this.currentId}`]);
  }
}
