import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "course/:topic/:category/:mode",
    loadComponent: () =>
      import("./components/data-layout/data-layout.component").then(
        (m) => m.DataLayoutComponent,
      ),
  },
  {
    path: "serverless-computing",
    loadComponent: () =>
      import(
        "./components/serverless-content/serverless-content.component"
      ).then((m) => m.ServerlessContentComponent),
  },
];
