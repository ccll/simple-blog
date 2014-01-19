/// <reference path='config.ts' />
/// <reference path='collections.ts' />

declare var Meteor;
declare var Math;

function page_count(): number {
    var per_page = config.posts_per_page;
    return Math.floor((Posts.find().count() + per_page - 1) / per_page);
}

Meteor.methods({

    // Get all tags.
    get_all_tags: function(): string[] {

    },

    // Get post list.
    post_list: function(tag:string, page:number): PostList {
        if (page < 1) {
            throw new Meteor.Error(400, '无效的page');
        }

        var per_page = config.posts_per_page;
        var page_count = Math.floor((Posts.find().count() + per_page - 1) / per_page);

        if (page > page_count) {
            throw new Meteor.Error(400, '无效的page');
        }

        var tags = Posts.distinct('tags');

        var query = tag ? {tags: tag} : {};
        var limit = config.posts_per_page;
        var offset = limit * (page-1);
        var posts = Posts.find(query,
            {sort: {created_at:-1}, skip:offset, limit: limit}).fetch();

        return <PostList>{
            page_count: page_count,
            tags: tags,
            posts: posts
        };
    }

});
