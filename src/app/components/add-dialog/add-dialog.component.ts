import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

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
  onCloseDialog() {
    this.closeDialogButton.emit();
  }
  onDialogOutput() {
    // Logic to handle the output when the dialog is confirmed
    console.log('Dialog output button clicked');
    this.emiOutput.emit();
  }
}
