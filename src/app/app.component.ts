import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HomeComponent } from "./components/home/home.component";
import { ResourcesService } from "./services/resources.service";
import { V2Component } from "./versions/v2/v2/v2.component";
import { V3Component } from "./versions/v3/v3.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [CommonModule, V2Component, V3Component, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = "resources";
  resourceService = inject(ResourcesService);
  router =inject(Router)
  @ViewChild("editorElem") editorEl!: ElementRef;
  ngOnInit(): void {
    // this.router.navigate(["/course/angular/components/51baafe2-aa57-4a80-b2b9-f1c8f19b04f6/view"]);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.resourceService.getTechnologies().subscribe((data) => {
    //   console.log("All contents:", data);
    // });
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
