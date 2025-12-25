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
@Component({
  selector: 'app-add-dialog',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DialogComponent],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css',
})
export class AddDialogComponent {
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
      addTechnology({
        technology: this.form.value,
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
//   @Input() payload!: { technologyId: string };
// private fb: FormBuilder
//   form = this.fb.group({
//     name: ['', Validators.required],
//     description: [''],
//   });

//   constructor(private store: Store, private fb: FormBuilder) {}

//   submit() {
//     this.store.dispatch(
//       addTopic({
//         technologyId: this.payload.technologyId,
//         topic: this.form.value,
//       })
//     );
//   @Input('dialogType') dialogType!: string;
//   @Input('dialogValue') dialogValue!: any;
//   @Input('dialogMode') dialogMode!: any;
//   dialogTitle = 'Add New Resource';
//   dialogContent =
//     'Please fill in the details of the new resource you want to add.';
//   dialogOutputButton = 'Add Technology';
//   emiOutput = output();
//   dialogForm!: FormGroup;
//   private readonly store = inject(Store);
//   // constructor(private fb: FormBuilder) {}
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['dialogType'] && !changes['dialogType'].firstChange) {
//       console.log(changes);
//       if ((changes['dialogType'].currentValue = 'tech')) {
//         this.dialogTitle = 'Add New Resource';
//         this.dialogContent =
//           'Please fill in the details of the new resource you want to add.';
//         this.dialogOutputButton = 'Add Technology';
//       } else {
//         this.dialogTitle = 'Add New Topic';
//         this.dialogContent =
//           'Please fill in the details of the new topic you want to add.';
//         this.dialogOutputButton = 'Add Topic';
//       }
//     }
//   }
//   ngOnInit(): void {
//     if (this.dialogType == 'tech') {
//       this.dialogTitle = 'Add New Resource';
//       this.dialogContent =
//         'Please fill in the details of the new resource you want to add.';
//       this.dialogOutputButton = 'Add Technology';
//     } else {
//       this.dialogTitle = 'Add New Topic';
//       this.dialogContent =
//         'Please fill in the details of the new topic you want to add.';
//       this.dialogOutputButton = 'Add Topic';
//     }
//     this.dialogForm = this.fb.group({
//       name: ['', Validators.required],
//       description: [''],
//       topic: [''],
//     });
//     console.log(this.dialogValue);
//     if (this.dialogValue) {
//       this.dialogForm.patchValue({
//         name: this.dialogValue?.label,
//         ...this.dialogValue,
//       });
//       this.dialogForm.get('name')?.disable();
//       this.dialogForm.get('description')?.disable();
//     }
//     if (this.dialogMode == 'edit') {
//       this.dialogForm.get('name')?.enable();
//       this.dialogForm.get('description')?.enable();
//     }
//   }
//   onCloseDialog() {
//     this.store.dispatch(toggleDialog({ show: false }));
//   }
//   onDialogOutput() {
//     this.store.dispatch(toggleDialog({ show: false }));
//     if (this.dialogType == '') {
//       this.store.dispatch(addTechnology({ technology: this.dialogForm.value }));
//     } else {
//       this.store.dispatch(addTopic({ technology: this.dialogForm.value }));
//     }
//   }
