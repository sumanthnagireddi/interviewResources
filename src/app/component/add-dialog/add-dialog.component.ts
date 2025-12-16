import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleDialog } from '../../store/actions/dialog.actions';

@Component({
  selector: 'app-add-dialog',
  imports: [NgClass],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css'
})
export class AddDialogComponent {
  dialogTitle = input('Add New Resource');
  dialogContent = input('Please fill in the details of the new resource you want to add.')
  dialogOutputButton = input('Add');
  closeDialogButton = output();
  emiOutput = output();
  private readonly store = inject(Store);
  onCloseDialog() {
    this.closeDialogButton.emit();
    this.store.dispatch(toggleDialog({ show: false }));
  }
  onDialogOutput() {
    this.emiOutput.emit();
    this.store.dispatch(toggleDialog({ show: false }));
  }

}
