/// <reference path='config.ts' />
/// <reference path='collections.ts' />

declare var Meteor;
declare var Math;
declare var check;
declare var String;
declare var Number;
declare var console;

Meteor.methods({

    // Get post list.
    get_post_list: function(tag:string, page:number): PostList {
        check(tag, String);
        check(page, Number);

        if (page < 1) {
            throw new Meteor.Error(400, '无效的page');
        }

        // Collect all tags.
        var tags = Posts.distinct('tags');

        // Posts.
        var query = tag ? {tags: tag} : {};
        var limit = config.posts_per_page;
        var offset = limit * (page-1);
        var posts = Posts.find(query,
            {
                sort: {created_at:-1},
                skip:offset,
                limit: limit,
                fields: {content: 0}
            })
            .fetch();

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
    },


    // Get a single post.
    get_post: function(post_id:string): Post {
        check(post_id, String);

        return Posts.findOne({_id: post_id});
    },

    // Save draft.
    save_draft: function(post_id:string, post_content:string) {
        check(post_id, String);
        check(post_content, String);
    }

});
