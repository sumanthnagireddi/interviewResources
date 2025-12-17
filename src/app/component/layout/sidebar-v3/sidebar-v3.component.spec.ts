import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarV3Component } from './sidebar-v3.component';

describe('SidebarV3Component', () => {
  let component: SidebarV3Component;
  let fixture: ComponentFixture<SidebarV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarV3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
