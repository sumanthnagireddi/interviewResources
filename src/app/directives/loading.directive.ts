import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  inject,
  effect
} from '@angular/core';
import { LoadingService } from '../services/loading.service';

/**
 * Structural directive to show/hide content based on loading state
 *
 * Usage:
 * <div *appLoading="'my-key'; skeleton: skeletonTemplate">
 *   <!-- Content shown when not loading -->
 * </div>
 *
 * <ng-template #skeletonTemplate>
 *   <app-skeleton type="card"></app-skeleton>
 * </ng-template>
 *
 * Or without skeleton (just hides content):
 * <div *appLoading="'my-key'">
 *   <!-- Content shown when not loading -->
 * </div>
 */
@Directive({
  selector: '[appLoading]',
  standalone: true
})
export class LoadingDirective implements OnInit, OnDestroy {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private loadingService = inject(LoadingService);

  @Input('appLoading') loadingKey: string = '';
  @Input('appLoadingSkeleton') skeletonTemplate?: TemplateRef<any>;

  private hasView = false;
  private hasSkeletonView = false;

  ngOnInit(): void {
    effect(() => {
      const isLoading = this.loadingService.isLoading(this.loadingKey);
      this.updateView(isLoading);
    });
  }

  private updateView(isLoading: boolean): void {
    if (isLoading) {
      // Show skeleton if provided
      if (!this.hasSkeletonView && this.skeletonTemplate) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.skeletonTemplate);
        this.hasSkeletonView = true;
        this.hasView = false;
      } else if (!this.skeletonTemplate) {
        // Just hide content if no skeleton
        this.viewContainer.clear();
        this.hasView = false;
      }
    } else {
      // Show actual content
      if (!this.hasView) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
        this.hasSkeletonView = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.loadingService.stopLoading(this.loadingKey);
  }
}
