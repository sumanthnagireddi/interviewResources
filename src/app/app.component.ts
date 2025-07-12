import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { EditorComponent } from "./components/editor/editor.component";
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { ResourcesService } from "./services/resources.service";
import { Store } from "@ngrx/store";
import { loadTechnologies } from "./store/actions/sidebar.actions";
import { selectTechnologies } from "./store/selectors/sidebar.selectors";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [CommonModule, SidebarComponent, RouterOutlet, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = "resources";
  resourceService = inject(ResourcesService);

  @ViewChild("editorElem") editorEl!: ElementRef;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.resourceService.getAllContents().subscribe((data) => {
      console.log("All contents:", data);
    });
  }
  getContent() {
    const html = (this.editorEl.nativeElement as any).getHTML();
    console.log(html);
  }

  setContent() {
    const html = "<p>Hello from Angular!</p>";
    (this.editorEl.nativeElement as any).setHTML(html);
  }
}
