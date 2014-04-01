/// <reference path='config.ts' />
/// <reference path='collections.ts' />

declare var Meteor;
declare var Math;
declare var check;
declare var String;
declare var Number;
declare var console;

function getPostList(tag:string, page:number):PostList {
  check(tag, String);
  check(page, Number);

  if (page < 1) {
    throw new Meteor.Error(400, '无效的参数page');
  }

  // Collect all tags.
  var tags = Posts.distinct('tags');

  // Posts.
  var query = tag ? {tags: tag} : {};
  var limit = config.posts_per_page;
  var offset = limit * (page - 1);
  var posts = Posts.find(query,
      {
        sort: {created_at: -1},
        skip: offset,
        limit: limit,
        fields: {content: 0}
      })
      .fetch();

  // Total pages.
  var postPerPage = config.posts_per_page;
  var pageCount = Math.floor((Posts.count(query) + postPerPage - 1) / postPerPage);

  if (page > pageCount) {
    throw new Meteor.Error(400, '无效的参数page');
  }

  return <PostList>{
    pageCount: pageCount,
    tags: tags,
    posts: posts
  };
}

function getAllPostList(tag:string):PostList {
  check(tag, String);

  // Collect all tags.
  var tags = Posts.distinct('tags');

  // Posts.
  var query = tag ? {tags: tag} : {};
  var posts = Posts.find(query,
      {
        sort: {created_at: -1},
        fields: {content: 0}
      })
      .fetch();

  return <PostList>{
    pageCount: 1,
    tags: tags,
    posts: posts
  };
}

Meteor.methods({

  // Get post list by tag and page
  getPostList: function (tag:string, page:number):PostList {
    return getPostList(tag, page);
  },

  // Get all posts by tag
  getAllPostList: function (tag:string):PostList {
    return getAllPostList(tag);
  },

  // Get a single post.
  getPost: function (post_id:string):Post {
    check(post_id, String);
    return Posts.findOne({_id: post_id});
  },

  // Save draft.
  save_draft: function (post_id:string, post_content:string) {
    check(post_id, String);
    check(post_content, String);
  }

});
