import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { ContentService } from '../../services/content.service';
import { EditorComponent } from '../../component/editor/editor.component';
import { BreadcrumbComponent } from '../../component/breadcrumb/breadcrumb.component';
import { SkeletonComponent } from '../../component/skeleton/skeleton.component';
import { catchError, delay, throwError } from 'rxjs';

@Component({
  selector: 'app-content-layout',
  imports: [
    EditorComponent,
    CommonModule,
    BreadcrumbComponent,
    RouterLink,
    SkeletonComponent,
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentLayoutComponent implements OnInit {
  @ViewChild('contentContainer') contentContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('tocContainer') tocContainer!: ElementRef<HTMLDivElement>;

  activeHeading: string | null = null;

  // Cache headings for performance
  private cachedHeadings: HTMLElement[] = [];
  contentAvailable = true;
  currentId = '';
  content: any;
  currentTechnology!: string;
  contentLoader: boolean = true;
  headings: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private service: ContentService,
    private route: Router
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.currentId = params['pageId'];
      this.getContent(this.currentId);
      // this.service.updateLastViewed(this.currentId);
    });
  }
  addHeadingIds(html: string): string {
    let idx = 0;
    return html.replace(
      /<h([1-6])([^>]*)>(.*?)<\/h\1>/gi,
      (match, level, attrs, text) => {
        const id = `heading-${idx++}`;
        return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
      }
    );
  }

  scrollToHeading(text: string) {
    const container = this.contentContainer.nativeElement;

    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');

    for (const heading of headings) {
      const clean = heading.textContent?.trim().replace(/^\d+\.\s*/, '');

      if (clean === text) {
        heading.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        this.activeHeading = text;
        break;
      }
    }
  }
  // cacheHeadings(): void {
  //   if (!this.contentContainer) return;
  //   const container = this.contentContainer.nativeElement;

  //   this.cachedHeadings = Array.from(
  //     container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  //   ) as HTMLElement[];
  //   console.log('cached headings:', this.cachedHeadings);
  // }

  extractHeadings(html: string): string[] {
    const headingRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi;
    const matches: string[] = [];
    let match;

    while ((match = headingRegex.exec(html)) !== null) {
      const cleanHeading = match[1].trim().replace(/^\d+\.\s*/, ''); // removes "1. ", "10. ", etc.

      matches.push(cleanHeading);
    }

    return matches;
  }

  getContent(id: string): void {
    this.contentLoader = true;
    this.contentAvailable = false;

    this.service
      .fetchContent(id)
      .pipe(
        catchError((err) => throwError(() => err).pipe(delay(500)))
      )
      .subscribe({
        next: (data: any) => {
          const rawHtml = data?.body ?? null;
          this.content = this.addHeadingIds(rawHtml);
          this.headings = this.extractHeadings(this.content);
          setTimeout(() => {
            // this.cacheHeadings();
            this.onScroll(); // initialize active heading

          }, 0);
          this.contentAvailable = !!this.content;
          this.contentLoader = false;
          this.currentTechnology = data?.title;
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
  onScroll(): void {
    if (!this.contentContainer) return;

    const container = this.contentContainer.nativeElement;
    const containerTop = container.getBoundingClientRect().top;

    const ACTIVATION_OFFSET = 100;

    let currentActive: string | null = null;

    // 🔑 ALWAYS READ FROM DOM, NOT STRING ARRAY
    const domHeadings = container.querySelectorAll(
      'h1, h2, h3, h4, h5, h6'
    );

    for (const heading of Array.from(domHeadings)) {
      const headingTop = heading.getBoundingClientRect().top;

      const cleanText =
        heading.textContent?.trim().replace(/^\d+\.\s*/, '') ?? '';

      if (headingTop - containerTop <= ACTIVATION_OFFSET) {
        currentActive = cleanText;
      } else {
        break;
      }
    }

    // Top fallback
    if (!currentActive && domHeadings.length) {
      currentActive =
        domHeadings[0].textContent
          ?.trim()
          .replace(/^\d+\.\s*/, '') ?? null;
    }

    if (this.activeHeading !== currentActive) {
      this.activeHeading = currentActive;
      this.scrollActiveTocItem(); // 👈 auto-scroll sidebar
    }

  }

  scrollActiveTocItem(): void {
    if (!this.tocContainer || !this.activeHeading) return;

    const container = this.tocContainer.nativeElement;

    const activeItem = Array.from(
      container.querySelectorAll('a')
    ).find(
      (el) =>
        el.textContent?.trim() === this.activeHeading
    );

    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest', // 👈 key for good UX
      });
    }
  }

}
