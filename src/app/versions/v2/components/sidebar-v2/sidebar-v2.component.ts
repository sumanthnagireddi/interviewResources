import { Component, inject, output } from '@angular/core';
import { ResourcesService } from '../../../../services/resources.service';
import { Store } from '@ngrx/store';
import { loadCurrentContent, loadTechnologies } from '../../../../store/actions/sidebar.actions';
import { selectCurentContent, selectTechnologies } from '../../../../store/selectors/sidebar.selectors';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CollapseIconComponent } from "../collapse-icon/collapse-icon.component";

@Component({
  selector: 'app-sidebar-v2',
  imports: [NgFor, NgIf, CommonModule, CollapseIconComponent],
  templateUrl: './sidebar-v2.component.html',
  styleUrl: './sidebar-v2.component.css'
})
export class SidebarV2Component {
  private readonly apiService = inject(ResourcesService)
  private readonly store$ = inject(Store)
  technologies: any;
  sidebarMapper: any = [];
  currentContent$: any;
  emitContent = output<any>()
  sidebarState = output<boolean>()
  selectedCategoryId: string | null = null;
  ngOnInit(): void {
    const cachedSidebar = sessionStorage.getItem('sidebarMapper');
    if (cachedSidebar) {
      this.sidebarMapper = JSON.parse(cachedSidebar);
    } else {
      this.store$.dispatch(loadTechnologies());
      this.store$.select(selectTechnologies).subscribe((data) => {
        this.technologies = data;
        this.sidebarMapper = [];
        let pending = data.data.length;
        data.data.forEach(element => {
          this.apiService.getCategoriesByTechnologyId(element.id).subscribe((categories) => {
            this.pushToSidebarMapper(element, categories);
            pending--;
            if (pending === 0) {
              sessionStorage.setItem('sidebarMapper', JSON.stringify(this.sidebarMapper));
            }
          });
        });
      });
    }
  }
  showSidebar() {
    console.log('clicked')
    this.sidebarState.emit(true);
  }
  pushToSidebarMapper(technology: any, categories: any) {
    this.sidebarMapper.push({
      ...technology,
      categories: categories

    });
  }
  updateContent(subItem: any) {
    this.selectedCategoryId = subItem.id; // Track selected category
    this.emitContent.emit(subItem);
  }
}


