import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleDialog } from '../../store/actions/dialog.actions';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addTechnology } from '../../store/actions/technology.actions';
@Component({
  selector: 'app-add-dialog',
  imports: [NgClass, ReactiveFormsModule, FormsModule],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css'
})
export class AddDialogComponent {
  dialogTitle = input('Add New Resource');
  dialogContent = input('Please fill in the details of the new resource you want to add.')
  dialogOutputButton = input('Add');
  closeDialogButton = output();
  emiOutput = output();
  dialogForm!: FormGroup
  private readonly store = inject(Store);
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dialogForm = this.fb.group({
      name: ['', Validators.required],
      topic: ['']
    })
  }
  onCloseDialog() {
    this.closeDialogButton.emit();
    this.store.dispatch(toggleDialog({ show: false }));
  }
  onDialogOutput() {
    console.log('Dialog form value:', this.dialogForm.value);
    this.store.dispatch(toggleDialog({ show: false, value: this.dialogForm.value.name }));
    this.store.dispatch(addTechnology({ technologyName: this.dialogForm.value }));
  }

}
