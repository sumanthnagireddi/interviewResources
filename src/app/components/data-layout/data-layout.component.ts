import { Component, effect, inject, input } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  loadCurrentContent,
  setNewCurrentContent,
  updateCurrentContent,
} from "../../store/actions/sidebar.actions";
import {
  selectCurentContent,
  selectTechnologies,
} from "../../store/selectors/sidebar.selectors";
import { EditorComponent } from "../editor/editor.component";
import { LoaderComponent } from "../loader/loader.component";
import { DatePipe, NgIf } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-data-layout",
  imports: [EditorComponent, LoaderComponent, NgIf, DatePipe],
  templateUrl: "./data-layout.component.html",
  styleUrl: "./data-layout.component.css",
})
export class DataLayoutComponent {
  category = input<string>("category");
  mode = input<string>("view");
  topic = input<string>("topic");
  store = inject(Store);
  router = inject(Router);
  currentContent$: any;
  currentMode: string = "view";

  constructor() {
    effect(() => {
      this.currentMode = this.mode();
      this.store.dispatch(loadCurrentContent({ contentID: this.category() }));
      this.store.select(selectCurentContent).subscribe((content: any) => {
        console.log("Current content:", content?.loading);
        this.currentContent$ = content;
      });
    });
  }

  ngOnInit(): void {}

  toggleEditMode() {
    const newMode = this.currentMode === "view" ? "edit" : "view";
    const currentRoute = this.router.url;
    const routeParts = currentRoute.split("/");
    routeParts[routeParts.length - 1] = newMode; // Replace the last part (mode)
    const newRoute = routeParts.join("/");
    this.router.navigate([newRoute]);
  }

  saveContent(data: any) {
    if (
      !this.currentContent$?.data ||
      this.currentContent$?.data.length === 0
    ) {
      this.store.dispatch(
        setNewCurrentContent({
          contentPayload: {
            parent: this.category(),
            content: data,
            updatedOn: new Date().toISOString(),
          },
        }),
      );
    } else {
      this.store.dispatch(
        updateCurrentContent({
          contentPayload: {
            id: this.currentContent$?.data[0]?.docId,
            data: data,
            updatedOn: new Date().toISOString(),
          },
        }),
      );
    }
  }
}
