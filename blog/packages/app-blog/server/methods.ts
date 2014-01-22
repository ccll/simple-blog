/// <reference path='config.ts' />
/// <reference path='collections.ts' />

declare var Meteor;
declare var Math;
declare var console;

Meteor.methods({

    // Get post list.
    post_list: function(tag:string, page:number): PostList {
        if (page < 1) {
            throw new Meteor.Error(400, '无效的page');
        }

        // Tags.
        var tags = Posts.distinct('tags');

        // Posts.
        var query = tag ? {tags: tag} : {};
        var limit = config.posts_per_page;
        var offset = limit * (page-1);
        var posts = Posts.find(query,
            {sort: {created_at:-1}, skip:offset, limit: limit}).fetch();

        // Total pages.
        var per_page = config.posts_per_page;
        var page_count = Math.floor((Posts.count(query) + per_page - 1) / per_page);

        if (page > page_count) {
            throw new Meteor.Error(400, '无效的page');
        }

        return <PostList>{
            page_count: page_count,
            tags: tags,
            posts: posts
        };
    }

});
