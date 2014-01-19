declare var Meteor;

class Post {
    title: string;
    content: string;
    tags: string[];
    created_at: number; // milliseconds from 1970
}

class PostList {
    page_count: number;
    tags: string[];
    posts: Post[];
}
