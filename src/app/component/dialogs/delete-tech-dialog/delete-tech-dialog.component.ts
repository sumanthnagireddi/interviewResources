import { Component, inject, Input } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { Store } from '@ngrx/store';
import { deleteTechnology } from '../../../store/actions/technology.actions';
import { closeDialog } from '../../../store/actions/dialog.actions';

@Component({
  selector: 'app-delete-tech-dialog',
  imports: [DialogComponent],
  templateUrl: './delete-tech-dialog.component.html',
  styleUrl: './delete-tech-dialog.component.css',
})
export class DeleteTechDialogComponent {
  @Input() payload!: any;
  private readonly store = inject(Store);
  submit() {
    this.store.dispatch(
      deleteTechnology({
        technologyId: this.payload?.technologyId,
      })
    );
    this.store.dispatch(closeDialog());
  }

  onCloseDialog() {
    this.store.dispatch(closeDialog());
  }
}
