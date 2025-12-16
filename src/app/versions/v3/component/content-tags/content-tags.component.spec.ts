import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTagsComponent } from './content-tags.component';

describe('ContentTagsComponent', () => {
  let component: ContentTagsComponent;
  let fixture: ComponentFixture<ContentTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
