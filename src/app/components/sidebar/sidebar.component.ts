import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
  HostListener,
  OnInit,
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
export class SidebarComponent implements OnInit {
  technologies$: Technologies[] | any;
  subTechnologies$: any;
  currentTechnology: any;
  currentSubTechnology: any;
  currenttechName:any
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
  isMobileMenuOpen: boolean = false;
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
    // Close other items and set current technology
    if (this.currentTechnology === tech.id) {
      // If clicking the same item, close it
      this.currentTechnology = null;
    } else {
      // Set new current technology and load its sub-technologies
      this.currentTechnology = tech.id;

      const formattedName = tech.name?.replace(/\s+/g, '-').toLowerCase();
      console.log('Formatted Technology Name:', formattedName);
      this.currenttechName = formattedName
      this.store.dispatch(loadSubTechnologies({ technology: tech.id }));
    }
  }
  getSubItem(name: string): string {
    return name.replace(/\s+/g, "-").toLowerCase()
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

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = "auto";
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
  editPage(item: any, technology: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate([`course/${item.name}/${technology.name}/${technology.id}/edit`]);
    // this.router.navigate(["/course/Angular/Components/51baafe2-aa57-4a80-b2b9-f1c8f19b04f6/view"]);

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

  // Close popovers when clicking outside
  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInsidePopover =
      target.closest('[role="menu"]') || target.closest(".popover-trigger");

    if (!clickedInsidePopover) {
      this.showManagePopover = false;
      this.showManageSubPopover = false;
    }
  }

  // Handle escape key to close mobile menu
  @HostListener("document:keydown.escape", ["$event"])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Handle window resize to close mobile menu on larger screens
  @HostListener("window:resize", ["$event"])
  onWindowResize(event: Event) {
    const target = event.target as Window;
    if (target.innerWidth >= 1024) {
      // lg breakpoint
      this.closeMobileMenu();
    }
  }
  
}
