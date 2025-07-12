import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { Store } from "@ngrx/store";
import {
  addCategory,
  loadSubTechnologies,
  loadTechnologies,
} from "../../store/actions/sidebar.actions";
import {
  selectSubTechnologies,
  selectTechnologies,
} from "../../store/selectors/sidebar.selectors";
import { NgClass, NgFor, NgIf } from "@angular/common";
import { of } from "rxjs";
import { LoaderComponent } from "../loader/loader.component";
import { Technologies } from "../../store/reducers/sidebar.reducer";
import { AddDialogComponent } from "../add-dialog/add-dialog.component";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: "app-sidebar",
  imports: [
    NgFor,
    NgClass,
    LoaderComponent,
    NgIf,
    AddDialogComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  technologies$: Technologies[] | any;
  subTechnologies$: any;
  currentTechnology: any;
  currentSubTechnology: any;
  loading$ = of(false);
  store = inject(Store);
  showAddDialog = false;
  dataForm: FormGroup;
  currentTechologyForPage: any;
  currentManageForPage: any;
  showManagePopover: boolean = false;
  showDeleteDialog: boolean = false;
  currentSubManageForPage: any;
  showManageSubPopover: boolean = false;
  router = inject(Router);
  constructor(private fb: FormBuilder) {
    this.dataForm = this.fb.group({
      name: [""],
    });
    this.store.dispatch(loadTechnologies());
  }
  @ViewChildren("details") detailsElements!: QueryList<
    ElementRef<HTMLDetailsElement>
  >;

  ngOnInit(): void {
    this.store.select(selectTechnologies).subscribe((technologies) => {
      this.technologies$ = technologies;
    });
    this.store.select(selectSubTechnologies).subscribe((subTechnologies) => {
      this.subTechnologies$ = subTechnologies;
    });
  }
  setCurrentItem(technology: any, event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.currentTechnology = technology;
  }
  setSubTechnologies(tech: any) {
    this.store.dispatch(loadSubTechnologies({ technology: tech.id }));
  }
  setCurrentSubTechnology(subTech: any) {
    this.currentSubTechnology = subTech;
    // this.store.dispatch(loadSubTechnologies({ technology: subTech.id }));
  }
  onToggle(openedDetails: HTMLDetailsElement, technology: any) {
    this.setSubTechnologies(technology);
    this.detailsElements.forEach((details: any) => {
      if (details !== openedDetails && details.open) {
        details.open = false;
      }
    });
  }
  addPage(technology: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showAddDialog = true;
    this.currentTechologyForPage = technology;
  }
  managePage(technology: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.currentManageForPage = technology;
    this.showManagePopover = !this.showManagePopover;
    // Close sub popover if open
    this.showManageSubPopover = false;
  }
  manageSubPage(subTechnology: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.currentSubManageForPage = subTechnology;
    this.showManageSubPopover = !this.showManageSubPopover;
    // Close main popover if open
    this.showManagePopover = false;
  }
  closeDialog() {
    this.showAddDialog = false;
    this.showDeleteDialog = false;
    this.showManagePopover = false;
    this.showManageSubPopover = false;
  }
  handleOutput() {
    const payload = {
      name: this.dataForm.value.name,
      parent: this.currentTechologyForPage.id,
    };
    this.store.dispatch(addCategory({ payload }));
    this.dataForm.reset();
    this.showAddDialog = false;
  }
  deletePage(id: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showDeleteDialog = true;
  }
  editPage(technology: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate([`course/${technology.name}/${technology.id}/edit`]);
  }
  get sortedTechnologies() {
    return (
      this.technologies$?.data
        ?.slice()
        ?.sort((a: { name: string }, b: { name: any }) =>
          a.name.localeCompare(b.name),
        ) || []
    );
  }
  get sortedSubTechnologies() {
    return (
      this.subTechnologies$?.data
        ?.slice()
        ?.sort((a: { name: string }, b: { name: any }) =>
          a.name.localeCompare(b.name),
        ) || []
    );
  }
}
