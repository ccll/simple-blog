/// <reference path='../shared/models.ts' />
/// <reference path='config.ts' />

declare var Meteor;
declare var Date;

var Posts = new Meteor.Collection('posts');
this.Posts = Posts;


// Mock data.
Meteor.startup(function() {
    if (Posts.find().count() == 0) {
        for (var i=0; i<14; ++i) {
            var now = new Date();
            var when = new Date(now.getTime() + i*1000*60);
            var tags = (i % 2) == 0 ? ['Meteor', 'web'] : ['frontend'];

            var p = <Post>{
                title: 'Meteor开发指南(' + (i+1) + ')',
                content:
                    '## Hello, Meteor!\n' +
                    '---\n' +
                    '| title | value |\n' +
                    '|-------|------:|\n' +
                    '|shit| fuck |\n' +
                    '| fuck | shit|\n',
                tags: tags,
                created_at: when.getTime(),

                published: (i % 2) !== 0,
                draft: 'this is a draft'
            };
            Posts.insert(p);
        }
    } else {
    }
});
