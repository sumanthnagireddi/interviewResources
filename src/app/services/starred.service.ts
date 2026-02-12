import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Service to manage starred/bookmarked content using sessionStorage
 * This will be replaced with API calls in the future
 */
@Injectable({
  providedIn: 'root',
})
export class StarredService {
  private readonly STORAGE_KEY = 'starred_content';

  constructor() {}

  /**
   * Get all starred content IDs from sessionStorage
   */
  getStarredIds(): string[] {
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Check if a content is starred
   */
  isStarred(contentId: string): boolean {
    const starredIds = this.getStarredIds();
    return starredIds.includes(contentId);
  }

  /**
   * Add content to starred list
   */
  addToStarred(contentId: string): Observable<{ contentId: string }> {
    const starredIds = this.getStarredIds();
    if (!starredIds.includes(contentId)) {
      starredIds.push(contentId);
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(starredIds));
    }
    return of({ contentId });
  }

  /**
   * Remove content from starred list
   */
  removeFromStarred(contentId: string): Observable<{ contentId: string }> {
    let starredIds = this.getStarredIds();
    starredIds = starredIds.filter((id) => id !== contentId);
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(starredIds));
    return of({ contentId });
  }

  /**
   * Toggle starred status
   */
  toggleStarred(contentId: string): Observable<{ contentId: string; isStarred: boolean }> {
    const isCurrentlyStarred = this.isStarred(contentId);

    if (isCurrentlyStarred) {
      this.removeFromStarred(contentId).subscribe();
      return of({ contentId, isStarred: false });
    } else {
      this.addToStarred(contentId).subscribe();
      return of({ contentId, isStarred: true });
    }
  }

  /**
   * Clear all starred items
   */
  clearAllStarred(): Observable<boolean> {
    sessionStorage.removeItem(this.STORAGE_KEY);
    return of(true);
  }

  /**
   * Get count of starred items
   */
  getStarredCount(): number {
    return this.getStarredIds().length;
  }
}
