import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ServerlessContentComponent } from "./serverless-content.component";

describe("ServerlessContentComponent", () => {
  let component: ServerlessContentComponent;
  let fixture: ComponentFixture<ServerlessContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerlessContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerlessContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should toggle reactions", () => {
    expect(component.showReactions).toBeFalsy();
    component.toggleReactions();
    expect(component.showReactions).toBeTruthy();
  });

  it("should show comment box", () => {
    expect(component.showCommentBox).toBeFalsy();
    component.showComments();
    expect(component.showCommentBox).toBeTruthy();
  });

  it("should handle copy link", () => {
    spyOn(navigator.clipboard, "writeText");
    component.copyLink();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      window.location.href,
    );
  });
});
