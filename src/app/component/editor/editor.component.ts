import { NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, Input, input, OnInit, output, SimpleChanges, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { set } from '@angular/fire/database';

@Component({
  selector: 'app-editor',
  imports: [NgIf],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditorComponent implements OnChanges, AfterViewInit {
  @Input() data: any
  @Input() mode = 'view'
  content = output()
  @ViewChild('editorElem') editorEl!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.setContent(this.data);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      (this.editorEl.nativeElement as any).setHTML(this.data);
    }, 100);
  }

  getContent() {
    const html = (this.editorEl.nativeElement as any).getHTML();
    console.log('Retrieved HTML:', html);
    this.content.emit(html);
  }

  setContent(html = '<p>Hello from Angular!</p>') {
    console.log('Setting HTML:', html);
    (this.editorEl.nativeElement as any).setHTML(html.trim());
  }
}
