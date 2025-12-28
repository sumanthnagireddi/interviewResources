import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
  output,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { closeDialog } from '../../../store/actions/dialog.actions';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  addTechnology,
  addTopic,
} from '../../../store/actions/technology.actions';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { createBlog } from '../../../store/actions/blog.actions';
@Component({
  selector: 'app-add-blog',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DialogComponent],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css',
})
export class AddBlogComponent {
  @Input() payload!: any;
  form!: FormGroup;
  @Output() onDialogOutputButton = new EventEmitter<any>();
  constructor(private store: Store, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }
  submit() {
    this.store.dispatch(
      createBlog({
        blog: this.form.value,
      })
    );
    this.store.dispatch(closeDialog());
  }
  onDialogOutput() {
    this.onDialogOutputButton.emit();
  }
  onCloseDialog() {
    this.store.dispatch(closeDialog());
  }
}
