import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { closeDialog } from '../../../store/actions/dialog.actions';
import {
  editTechnology,
  editTopic,
} from '../../../store/actions/technology.actions';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-edit-topic-dialog',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DialogComponent],
  templateUrl: './edit-topic-dialog.component.html',
  styleUrl: './edit-topic-dialog.component.css',
})
export class EditTopicDialogComponent implements OnInit {
  @Input() payload!: any;
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}
  ngOnInit(): void {
    console.log(this.payload)
    this.form = this.fb.group({
      name: [this.payload?.technologyId?.label, Validators.required],
      topic_description: [this.payload?.technologyId?.topic_description],
    });
  }
  submit() {
    this.store.dispatch(
      editTopic({
        topic: this.form.get('name')?.value,
        topic_description: this.form.get('topic_description')?.value,
        topicId: this.payload?.technologyId?.id,
      })
    );
    this.store.dispatch(closeDialog());
  }
  onCloseDialog() {
    this.store.dispatch(closeDialog());
  }
}
