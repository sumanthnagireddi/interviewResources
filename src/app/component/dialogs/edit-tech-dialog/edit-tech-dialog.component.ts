import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { closeDialog } from '../../../store/actions/dialog.actions';
import {
  addTopic,
  editTechnology,
} from '../../../store/actions/technology.actions';
import { DialogComponent } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-tech-dialog',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DialogComponent],
  templateUrl: './edit-tech-dialog.component.html',
  styleUrl: './edit-tech-dialog.component.css',
})
export class EditTechDialogComponent implements OnInit {
  @Input() payload!: any;
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.payload?.technologyId?.label, Validators.required],
      description: [this.payload?.technologyId?.description],
    });
  }
  submit() {
    this.store.dispatch(
      editTechnology({
        technology: { id: this.payload?.technologyId?.id, ...this.form.value },
      })
    );
    this.store.dispatch(closeDialog());
  }
  onCloseDialog() {
    this.store.dispatch(closeDialog());
  }
}
