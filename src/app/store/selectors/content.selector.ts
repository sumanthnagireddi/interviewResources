import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContentState } from "../reducers/content.reducer";

export const selectContentState = createFeatureSelector<ContentState>('content');

export const selectTopContents = createSelector(
  selectContentState,
  (state: ContentState) => state?.topContents || []
);

export const selectRecentContents = createSelector(
  selectContentState,
  (state: ContentState) => state?.recentContent || []
);

export const selectAllContent = createSelector(
  selectContentState,
  (state: ContentState) => {
    // Combine all available content from different sources
    const allContent = [
      ...(state?.topContents || []),
      ...(state?.recentContent || []),
    ];

    // Remove duplicates based on id or _id
    const uniqueContent = allContent.filter(
      (content, index, self) =>
        index === self.findIndex((c) =>
          (c.id || c._id) === (content.id || content._id)
        )
    );

    return uniqueContent;
  }
);
