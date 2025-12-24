import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTechDialogComponent } from './delete-tech-dialog.component';

describe('DeleteTechDialogComponent', () => {
  let component: DeleteTechDialogComponent;
  let fixture: ComponentFixture<DeleteTechDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTechDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
