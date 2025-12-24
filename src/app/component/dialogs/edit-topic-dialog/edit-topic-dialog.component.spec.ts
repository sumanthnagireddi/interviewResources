import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTopicDialogComponent } from './edit-topic-dialog.component';

describe('EditTopicDialogComponent', () => {
  let component: EditTopicDialogComponent;
  let fixture: ComponentFixture<EditTopicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTopicDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTopicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
