import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseIconComponent } from './collapse-icon.component';

describe('CollapseIconComponent', () => {
  let component: CollapseIconComponent;
  let fixture: ComponentFixture<CollapseIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapseIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapseIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
