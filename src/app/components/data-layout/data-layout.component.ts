import { Component, effect, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCurrentContent, setNewCurrentContent, updateCurrentContent } from '../../store/actions/sidebar.actions';
import { selectCurentContent } from '../../store/selectors/sidebar.selectors';
import { EditorComponent } from "../editor/editor.component";
import { LoaderComponent } from "../loader/loader.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-data-layout',
  imports: [EditorComponent, LoaderComponent, NgIf],
  templateUrl: './data-layout.component.html',
  styleUrl: './data-layout.component.css'
})
export class DataLayoutComponent {
  category = input<string>('category');
  mode = input<string>('view');
  store = inject(Store);
  currentContent$: any;
  constructor() {
    effect(() => {
      this.store.dispatch(loadCurrentContent({ contentID: this.category() }));
      this.store.select(selectCurentContent).subscribe((content: any) => {
        console.log('Current content:', content?.loading);
        this.currentContent$ = content;
      })
    })
  }
  ngOnInit(): void {

  }
  saveContent(data: any) {
    console.log('Saving content:', data);
    console.log('Category:', this.currentContent$);
    if (!this.currentContent$?.data || this.currentContent$?.data.length === 0) {
      this.store.dispatch(setNewCurrentContent({ contentPayload: { parent: this.category(), content: data } }));

    } else {
      this.store.dispatch(updateCurrentContent({ contentPayload: { id: this.currentContent$?.data[0]?.docId, data: data } }));

    }
  }
}
