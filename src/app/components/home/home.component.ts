import { Component } from "@angular/core";
import { ServerlessContentComponent } from "../serverless-content/serverless-content.component";

@Component({
  selector: "app-home",
  imports: [ServerlessContentComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
