import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResourcesService } from "../../services/resources.service";
import { LoaderComponent } from "../loader/loader.component";
import { Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

@Component({
  selector: "app-serverless-content",
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: "./serverless-content.component.html",
  styleUrls: ["./serverless-content.component.css"],
})
export class ServerlessContentComponent implements OnInit {
  private resourcesService = inject(ResourcesService);

  // Data properties
  contentData: any = null;
  loading = true;
  error: string | null = null;

  // UI state properties
  showReactions = false;
  showCommentBox = false;

  // Reaction state
  userReactions: string[] = [];
  reactionCounts: { [key: string]: number } = {
    "👍": 0,
    "👏": 0,
    "🎉": 0,
  };

  ngOnInit() {
    this.loadServerlessContent();
  }

  loadServerlessContent() {
    this.loading = true;
    this.error = null;

    this.resourcesService
      .getServerlessContent()
      .pipe(
        catchError((error) => {
          console.error("Error loading serverless content:", error);
          this.error = "Failed to load content. Please try again.";
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((data) => {
        if (data && data.length > 0) {
          this.contentData = data[0];
          this.initializeReactions();
        }
      });
  }

  private initializeReactions() {
    if (this.contentData.reactions) {
      this.contentData.reactions.forEach((reaction: any) => {
        if (this.reactionCounts[reaction.emoji] !== undefined) {
          this.reactionCounts[reaction.emoji] = reaction.count || 0;
        }
      });
    }
  }

  toggleReactions() {
    this.showReactions = !this.showReactions;
  }

  addReaction(emoji: string) {
    if (!this.userReactions.includes(emoji)) {
      this.userReactions.push(emoji);
      this.reactionCounts[emoji]++;

      // Update in Firestore
      this.updateReactionsInFirestore();

      console.log(`Added reaction: ${emoji}`);
    } else {
      // Remove reaction if already added
      this.removeReaction(emoji);
    }
  }

  removeReaction(emoji: string) {
    const index = this.userReactions.indexOf(emoji);
    if (index > -1) {
      this.userReactions.splice(index, 1);
      this.reactionCounts[emoji] = Math.max(0, this.reactionCounts[emoji] - 1);

      // Update in Firestore
      this.updateReactionsInFirestore();

      console.log(`Removed reaction: ${emoji}`);
    }
  }

  private updateReactionsInFirestore() {
    if (this.contentData) {
      const reactions = Object.entries(this.reactionCounts).map(
        ([emoji, count]) => ({
          emoji,
          count,
        }),
      );

      const updatedContent = {
        ...this.contentData,
        reactions,
        updatedOn: new Date().toISOString(),
      };

      this.resourcesService.saveServerlessContent(updatedContent).subscribe({
        next: () => console.log("Reactions updated successfully"),
        error: (error) => console.error("Error updating reactions:", error),
      });
    }
  }

  showComments() {
    this.showCommentBox = true;
  }

  addComment(commentText: string) {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      author: "Current User", // Replace with actual user
      timestamp: new Date().toISOString(),
    };

    if (!this.contentData.comments) {
      this.contentData.comments = [];
    }

    this.contentData.comments.push(newComment);
    this.showCommentBox = false;

    // Update in Firestore
    this.resourcesService.saveServerlessContent(this.contentData).subscribe({
      next: () => console.log("Comment added successfully"),
      error: (error) => console.error("Error adding comment:", error),
    });
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href);
    console.log("Link copied to clipboard");
  }

  editContent() {
    console.log("Edit content clicked");
    // Navigate to edit mode or open editor
  }

  shareContent() {
    console.log("Share content clicked");
    // Implement share functionality
  }

  starContent() {
    console.log("Star content clicked");
    // Implement star functionality
  }

  watchContent() {
    console.log("Watch content clicked");
    // Implement watch functionality
  }

  incrementViews() {
    if (this.contentData) {
      this.contentData.views = (this.contentData.views || 0) + 1;
      this.resourcesService.saveServerlessContent(this.contentData).subscribe();
    }
  }

  hasUserReacted(emoji: string): boolean {
    return this.userReactions.includes(emoji);
  }

  getFormattedDate(): string {
    if (this.contentData?.createdDate) {
      return new Date(this.contentData.createdDate).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "2-digit",
        },
      );
    }
    return "Jul 06, 2025";
  }
}
