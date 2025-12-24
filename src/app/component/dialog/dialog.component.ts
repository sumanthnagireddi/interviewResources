import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

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
  onDialogOutput() {
    this.onDialogOutputButton.emit();
  }
  onCloseDialog() {
    this.closeDialogButton.emit();
  }
}
