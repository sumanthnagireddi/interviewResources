import { Component, Input, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { closeDialog } from '../../../store/actions/dialog.actions';
import { addTopic } from '../../../store/actions/technology.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-topic-dialog',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DialogComponent],
  templateUrl: './add-topic-dialog.component.html',
  styleUrl: './add-topic-dialog.component.css',
})
export class AddTopicDialogComponent implements OnInit {
  @Input() payload!: any;
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      topic: ['', Validators.required],
      topic_description: [''],
    });
    this.form.patchValue({
      name: this.payload?.technologyId?.label,
      description: this.payload?.technologyId?.description,
    });
    this.form.get('name')?.disable();
    this.form.get('description')?.disable();
  }

  submit() {
    this.store.dispatch(
      addTopic({
        technologyId: this.payload.technologyId,
        topic: this.form.get('topic')?.value,
        topic_description:this.form.get('topic_description')?.value
      })
    );
    this.store.dispatch(closeDialog());
  }
  onCloseDialog() {
    this.store.dispatch(closeDialog());
  }
}
