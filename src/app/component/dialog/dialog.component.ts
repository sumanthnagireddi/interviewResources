import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeDialog } from '../../store/actions/dialog.actions';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  dialogTitle = input('Add New Resource');
  dialogContent = input(
    'Please fill in the details of the new resource you want to add.'
  );
  @Output() closeDialogButton = new EventEmitter<any>();
  @Output() onDialogOutputButton = new EventEmitter<any>();
  dialogOutputButton = input('Add');
  private readonly store = inject(Store);

  onDialogOutput() {
    this.onDialogOutputButton.emit();
  }
  onCloseDialog() {
    this.store.dispatch(closeDialog());
  }
}
