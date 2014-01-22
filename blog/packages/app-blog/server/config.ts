declare var BrowserPolicy;
declare var Accounts;
declare var Meteor;

// Security.
BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();

BrowserPolicy.content.allowSameOriginForAll();

BrowserPolicy.content.allowEval();
BrowserPolicy.content.allowInlineStyles();


// Config post list.
var config = {
    posts_per_page: 10
};
this.config = config;


// Only allow 1 user.
Accounts.validateNewUser(function (user) {
    return Meteor.users.count() < 1;
});
