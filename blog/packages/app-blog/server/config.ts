declare var BrowserPolicy;

// Security.
BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();

BrowserPolicy.content.allowSameOriginForAll();

BrowserPolicy.content.allowEval();
BrowserPolicy.content.allowInlineStyles();

var config = {
    posts_per_page: 10
};
this.config = config;
