declare var Meteor;

class Post {
  title: string;
  content: string;
  tags: string[];
  created_at: number; // milliseconds from 1970
  updated_at: number;

  published: boolean;
  draft: string;
}

class PostList {
  pageCount: number;
  tags: string[];
  posts: Post[];
}

class PostListResult {
  tag: string;
  page: number;
  postList: PostList;
}
