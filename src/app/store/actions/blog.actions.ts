import { createAction, props } from '@ngrx/store';
import { Blog, BlogPost } from '../../model/blog.model';

/* =========================================================
   BLOG ACTION TYPES
   ========================================================= */

export enum BlogActionTypes {
  /* -------------------- BLOG -------------------- */
  loadBlogs = '[Blog] Load Blogs',
  loadBlogsSuccess = '[Blog] Load Blogs Success',
  loadBlogsFailure = '[Blog] Load Blogs Failure',

  loadBlogById = '[Blog] Load Blog By Id',
  loadBlogByIdSuccess = '[Blog] Load Blog By Id Success',
  loadBlogByIdFailure = '[Blog] Load Blog By Id Failure',

  createBlog = '[Blog] Create Blog',
  createBlogSuccess = '[Blog] Create Blog Success',
  createBlogFailure = '[Blog] Create Blog Failure',

  updateBlog = '[Blog] Update Blog',
  updateBlogSuccess = '[Blog] Update Blog Success',
  updateBlogFailure = '[Blog] Update Blog Failure',

  deleteBlog = '[Blog] Delete Blog',
  deleteBlogSuccess = '[Blog] Delete Blog Success',
  deleteBlogFailure = '[Blog] Delete Blog Failure',

  /* -------------------- BLOG POSTS -------------------- */
  loadPosts = '[Post] Load Posts',
  loadPostsSuccess = '[Post] Load Posts Success',
  loadPostsFailure = '[Post] Load Posts Failure',

  loadPostById = '[Post] Load Post By Id',
  loadPostByIdSuccess = '[Post] Load Post By Id Success',
  loadPostByIdFailure = '[Post] Load Post By Id Failure',

  createPost = '[Post] Create Post',
  createPostSuccess = '[Post] Create Post Success',
  createPostFailure = '[Post] Create Post Failure',

  updatePost = '[Post] Update Post',
  updatePostSuccess = '[Post] Update Post Success',
  updatePostFailure = '[Post] Update Post Failure',

  deletePost = '[Post] Delete Post',
  deletePostSuccess = '[Post] Delete Post Success',
  deletePostFailure = '[Post] Delete Post Failure',

  publishPost = '[Post] Publish Post',
  publishPostSuccess = '[Post] Publish Post Success',
  publishPostFailure = '[Post] Publish Post Failure',

  unpublishPost = '[Post] Unpublish Post',
  unpublishPostSuccess = '[Post] Unpublish Post Success',
  unpublishPostFailure = '[Post] Unpublish Post Failure',
}

/* =========================================================
   BLOG ACTIONS
   ========================================================= */

export const loadBlogs = createAction(
  BlogActionTypes.loadBlogs,
  props<{ page?: number; limit?: number }>()
);

export const loadBlogsSuccess = createAction(
  BlogActionTypes.loadBlogsSuccess,
  props<{ blogs: Blog[]; total: number }>()
);

export const loadBlogsFailure = createAction(
  BlogActionTypes.loadBlogsFailure,
  props<{ error: any }>()
);

export const loadBlogById = createAction(
  BlogActionTypes.loadBlogById,
  props<{ blogId: string }>()
);

export const loadBlogByIdSuccess = createAction(
  BlogActionTypes.loadBlogByIdSuccess,
  props<{ blog: Blog }>()
);

export const loadBlogByIdFailure = createAction(
  BlogActionTypes.loadBlogByIdFailure,
  props<{ error: any }>()
);

export const createBlog = createAction(
  BlogActionTypes.createBlog,
  props<{ blog: Partial<Blog> }>()
);

export const createBlogSuccess = createAction(
  BlogActionTypes.createBlogSuccess,
  props<{ blog: Blog }>()
);

export const createBlogFailure = createAction(
  BlogActionTypes.createBlogFailure,
  props<{ error: any }>()
);

export const updateBlog = createAction(
  BlogActionTypes.updateBlog,
  props<{ blogId: string; changes: Partial<Blog> }>()
);

export const updateBlogSuccess = createAction(
  BlogActionTypes.updateBlogSuccess,
  props<{ blog: Blog }>()
);

export const updateBlogFailure = createAction(
  BlogActionTypes.updateBlogFailure,
  props<{ error: any }>()
);

export const deleteBlog = createAction(
  BlogActionTypes.deleteBlog,
  props<{ blogId: string }>()
);

export const deleteBlogSuccess = createAction(
  BlogActionTypes.deleteBlogSuccess,
  props<{ blogId: string }>()
);

export const deleteBlogFailure = createAction(
  BlogActionTypes.deleteBlogFailure,
  props<{ error: any }>()
);

/* =========================================================
   BLOG POST ACTIONS
   ========================================================= */

export const loadPosts = createAction(
  BlogActionTypes.loadPosts,
  props<{ blogId: string }>()
);

export const loadPostsSuccess = createAction(
  BlogActionTypes.loadPostsSuccess,
  props<{ blogId: string; posts: BlogPost[] }>()
);

export const loadPostsFailure = createAction(
  BlogActionTypes.loadPostsFailure,
  props<{ error: any }>()
);

export const loadPostById = createAction(
  BlogActionTypes.loadPostById,
  props<{ postId: string }>()
);

export const loadPostByIdSuccess = createAction(
  BlogActionTypes.loadPostByIdSuccess,
  props<{ post: BlogPost }>()
);

export const loadPostByIdFailure = createAction(
  BlogActionTypes.loadPostByIdFailure,
  props<{ error: any }>()
);

export const createPost = createAction(
  BlogActionTypes.createPost,
  props<{ blogId: string; post: Partial<BlogPost> }>()
);

export const createPostSuccess = createAction(
  BlogActionTypes.createPostSuccess,
  props<{ post: BlogPost }>()
);

export const createPostFailure = createAction(
  BlogActionTypes.createPostFailure,
  props<{ error: any }>()
);

export const updatePost = createAction(
  BlogActionTypes.updatePost,
  props<{ postId: string; changes: Partial<BlogPost> }>()
);

export const updatePostSuccess = createAction(
  BlogActionTypes.updatePostSuccess,
  props<{ post: BlogPost }>()
);

export const updatePostFailure = createAction(
  BlogActionTypes.updatePostFailure,
  props<{ error: any }>()
);

export const deletePost = createAction(
  BlogActionTypes.deletePost,
  props<{ postId: string }>()
);

export const deletePostSuccess = createAction(
  BlogActionTypes.deletePostSuccess,
  props<{ postId: string }>()
);

export const deletePostFailure = createAction(
  BlogActionTypes.deletePostFailure,
  props<{ error: any }>()
);

export const publishPost = createAction(
  BlogActionTypes.publishPost,
  props<{ postId: string }>()
);

export const publishPostSuccess = createAction(
  BlogActionTypes.publishPostSuccess,
  props<{ postId: string }>()
);

export const publishPostFailure = createAction(
  BlogActionTypes.publishPostFailure,
  props<{ error: any }>()
);

export const unpublishPost = createAction(
  BlogActionTypes.unpublishPost,
  props<{ postId: string }>()
);

export const unpublishPostSuccess = createAction(
  BlogActionTypes.unpublishPostSuccess,
  props<{ postId: string }>()
);

export const unpublishPostFailure = createAction(
  BlogActionTypes.unpublishPostFailure,
  props<{ error: any }>()
);
