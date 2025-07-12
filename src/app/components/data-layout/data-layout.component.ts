import { Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCurrentContent, setNewCurrentContent, updateCurrentContent } from '../../store/actions/sidebar.actions';
import { selectCurentContent, selectTechnologies } from '../../store/selectors/sidebar.selectors';
import { EditorComponent } from "../editor/editor.component";
import { LoaderComponent } from "../loader/loader.component";
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-data-layout',
  imports: [EditorComponent, LoaderComponent, NgIf,DatePipe],
  templateUrl: './data-layout.component.html',
  styleUrl: './data-layout.component.css'
})
export class DataLayoutComponent {
  category = input<string>('category');
  mode = input<string>('view');
  technology = input<any>('technology');
  topic = input<string>('topic');
  store = inject(Store);
  currentContent$: any;
  @Output() technologyName = new EventEmitter<any>();
  constructor() {


    effect(() => {
  sessionStorage.setItem('currentTechnology', this.technology());
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
    if (!this.currentContent$?.data || this.currentContent$?.data.length === 0) {
      this.store.dispatch(setNewCurrentContent({ contentPayload: { parent: this.category(), content: data, updatedOn: new Date().toISOString() } }));

    } else {
      this.store.dispatch(updateCurrentContent({ contentPayload: { id: this.currentContent$?.data[0]?.docId, data: data, updatedOn: new Date().toISOString() } }));

    }
  }
}
