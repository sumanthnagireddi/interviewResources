import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTopicDialogComponent } from './delete-topic-dialog.component';

describe('DeleteTopicDialogComponent', () => {
  let component: DeleteTopicDialogComponent;
  let fixture: ComponentFixture<DeleteTopicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTopicDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTopicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
