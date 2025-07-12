import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-serverless-content",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./serverless-content.component.html",
  styleUrls: ["./serverless-content.component.css"],
})
export class ServerlessContentComponent {
  showReactions = false;
  showCommentBox = false;

  toggleReactions() {
    this.showReactions = !this.showReactions;
  }

  addReaction(emoji: string) {
    console.log(`Added reaction: ${emoji}`);
    // Add your reaction logic here
  }

  showComments() {
    this.showCommentBox = true;
  }

  addComment() {
    console.log("Add comment clicked");
    // Add your comment logic here
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href);
    console.log("Link copied to clipboard");
  }

  editContent() {
    console.log("Edit content clicked");
    // Add your edit logic here
  }

  shareContent() {
    console.log("Share content clicked");
    // Add your share logic here
  }

  starContent() {
    console.log("Star content clicked");
    // Add your star logic here
  }

  watchContent() {
    console.log("Watch content clicked");
    // Add your watch logic here
  }
}
