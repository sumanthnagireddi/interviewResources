import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechDialogComponent } from './edit-tech-dialog.component';

describe('EditTechDialogComponent', () => {
  let component: EditTechDialogComponent;
  let fixture: ComponentFixture<EditTechDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTechDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
