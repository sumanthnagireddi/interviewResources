import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteTopic } from '../../../store/actions/technology.actions';
import { closeDialog } from '../../../store/actions/dialog.actions';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-delete-topic-dialog',
  imports: [DialogComponent],
  templateUrl: './delete-topic-dialog.component.html',
  styleUrl: './delete-topic-dialog.component.css',
})
export class DeleteTopicDialogComponent {
  @Input() payload!: any;
  private readonly store = inject(Store);
  submit() {
    this.store.dispatch(
      deleteTopic({
        topicId: this.payload?.technologyId,
      })
    );
    this.store.dispatch(closeDialog());
  }

  onCloseDialog() {
    this.store.dispatch(closeDialog());
  }
}
