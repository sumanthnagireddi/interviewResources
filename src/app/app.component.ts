import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { ResourcesService } from "./services/resources.service";
import { Store } from "@ngrx/store";
import { loadRecentVisited, loadTopContents } from "./store/actions/content.actions";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [CommonModule, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = "resources";
  store = inject(Store);
  router = inject(Router)
  ngOnInit(): void {
    this.store.dispatch(loadTopContents());
    this.store.dispatch(loadRecentVisited())
  }
}
