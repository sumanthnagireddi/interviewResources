import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  inject,
  Input,
  input,
  output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleDialog } from '../../store/actions/dialog.actions';
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
} from '../../store/actions/technology.actions';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-add-dialog',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DialogComponent],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css',
})
export class AddDialogComponent {
  @Input('dialogType') dialogType!: string;
  @Input('dialogValue') dialogValue!: any;
  dialogTitle = 'Add New Resource';
  dialogContent =
    'Please fill in the details of the new resource you want to add.';
  dialogOutputButton = 'Add Technology';
  emiOutput = output();
  dialogForm!: FormGroup;
  private readonly store = inject(Store);
  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dialogType'] && !changes['dialogType'].firstChange) {
      console.log(changes);
      if ((changes['dialogType'].currentValue = 'tech')) {
        this.dialogTitle = 'Add New Resource';
        this.dialogContent =
          'Please fill in the details of the new resource you want to add.';
        this.dialogOutputButton = 'Add Technology';
      } else {
        this.dialogTitle = 'Add New Topic';
        this.dialogContent =
          'Please fill in the details of the new topic you want to add.';
        this.dialogOutputButton = 'Add Topic';
      }
    }
  }
  ngOnInit(): void {
    if (this.dialogType == 'tech') {
      this.dialogTitle = 'Add New Resource';
      this.dialogContent =
        'Please fill in the details of the new resource you want to add.';
      this.dialogOutputButton = 'Add Technology';
    } else {
      this.dialogTitle = 'Add New Topic';
      this.dialogContent =
        'Please fill in the details of the new topic you want to add.';
      this.dialogOutputButton = 'Add Topic';
    }
    this.dialogForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      topic: [''],
    });
    console.log(this.dialogValue);
    if (this.dialogValue) {
      this.dialogForm.patchValue({
        name: this.dialogValue?.label,
        ...this.dialogValue,
      });
      // Disable fields in edit mode
      this.dialogForm.get('name')?.disable();
      this.dialogForm.get('description')?.disable();
    }
  }
  onCloseDialog() {
    this.store.dispatch(toggleDialog({ show: false }));
  }
  onDialogOutput() {
    this.store.dispatch(toggleDialog({ show: false }));
    if (this.dialogType == '') {
      this.store.dispatch(addTechnology({ technology: this.dialogForm.value }));
    } else {
      this.store.dispatch(addTopic({ technology: this.dialogForm.value }));
    }
  }
}
