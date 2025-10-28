import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { SidebarV2Component } from '../components/sidebar-v2/sidebar-v2.component';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { NgFor, NgIf } from '@angular/common';
import { EditorComponent } from '../../../components/editor/editor.component';
import { ResourcesService } from '../../../services/resources.service';
import { HomeComponent } from "../../../components/home/home.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { CollapseIconComponent } from "../components/collapse-icon/collapse-icon.component";
import { LoaderComponent } from "../../../components/loader/loader.component";

@Component({
  selector: 'app-v2',
  imports: [SidebarV2Component, NgIf, EditorComponent, NgFor, CollapseIconComponent, LoaderComponent],
  standalone: true,
  templateUrl: './v2.component.html',
  styleUrl: './v2.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class V2Component {
  data = signal<any>('');
  content = output()
  mode = input<string>('view');
  isReady: boolean = false;
  headings: string[] = [];
  showSidebar = true;
  currentItem:any
  private readonly apiService = inject(ResourcesService)

  receiveContent(event: any) {
    this.isReady = false;
    this.currentItem=event
    this.apiService.getTopicById(event.id).subscribe((content) => {
      const rawHtml = content[0]?.content || '';
      const htmlWithIds = this.addHeadingIds(rawHtml);
      this.data.set(htmlWithIds);
      this.headings = this.extractHeadings(htmlWithIds);
      this.isReady = true;
    });
  }
  addHeadingIds(html: string): string {
    let idx = 0;
    return html.replace(/<h([1-6])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
      const id = `heading-${idx++}`;
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    });
  }
  manageSidebar(event:any){
    this.showSidebar=!this.showSidebar;
  }
  scrollToHeading(text: string) {
    // Find all heading elements in the document
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6,strong');
    for (const heading of Array.from(headings)) {
      if (heading.textContent?.trim() === text.trim()) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
    }
  }
  saveContent(event: any) {
    console.log('Saved HTML content:', event);
  }
  extractHeadings(html: string): string[] {
    const headingRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi;
    const matches = [];
    let match;
    while ((match = headingRegex.exec(html)) !== null) {
      matches.push(match[1].trim());
    }
    return matches;
  }
}
