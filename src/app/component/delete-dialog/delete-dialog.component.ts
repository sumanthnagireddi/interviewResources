import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleDialog } from '../../store/actions/dialog.actions';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addTechnology } from '../../store/actions/technology.actions';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-delete-dialog',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DialogComponent],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
})
export class DeleteDialogComponent {
  dialogTitle = input('Add New Resource');
  dialogContent = input(
    'Please fill in the details of the new resource you want to add.'
  );
  dialogOutputButton = input('Add');
  closeDialogButton = output();
  emiOutput = output();
  dialogForm!: FormGroup;
  private readonly store = inject(Store);
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.dialogForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      // topic: [''],
    });
  }
  onCloseDialog() {
    this.closeDialogButton.emit();
    this.store.dispatch(toggleDialog({ show: false }));
  }
  onDialogOutput() {
    console.log('Dialog form value:', this.dialogForm.value);
    this.store.dispatch(
      toggleDialog({ show: false, value: this.dialogForm.value.name })
    );
    this.store.dispatch(
      addTechnology({ technologyName: this.dialogForm.value })
    );
  }
}
