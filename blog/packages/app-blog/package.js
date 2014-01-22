Package.describe({
    summary: "blog.ccll.im",
    internal: true
});

Package.on_use(function (api, where) {
    //////////////////////////////////////////////////////////
    // Dependencies.

    // Client and server.
    api.use('standard-app-packages', ['client', 'server']);
    api.use('typescript-compiler', ['client', 'server']);
    api.use('accounts-password', ['client', 'server']);
    api.use('underscore-string-latest', ['client', 'server']);
    api.use('random', ['client', 'server']);

    // Client only.
    api.use('preserve-inputs', 'client');
    api.use('accounts-ui', 'client');
    api.use('session', 'client');
    api.use('less', 'client');
    api.use('templating', 'client');
    api.use('font-awesome-4', 'client');
    api.use('bootswatch-yeti', 'client');
    api.use('ngMeteor', 'client');
    api.use('angular-ui-router', 'client');
    api.use('marked', 'client');

    // Server only.
    api.use('email', 'server');
    api.use('browser-policy', 'server');
    api.use('mongo-ext', 'server');

    //////////////////////////////////////////////////////////
    // Files.

    //-----------------------
    // Shared code.
    api.add_files('shared/config.ts', ['client', 'server']);
    api.add_files('shared/models.ts', ['client', 'server']);

    //-----------------------
    // Client only.

    // Styles.
    api.add_files('client/styles/base.less', 'client');
    api.add_files('client/styles/override.less', 'client');

    // Partials.
    api.add_files('client/partials/icons.html', 'client');
    api.add_files('client/partials/header.html', 'client');
    api.add_files('client/partials/tags.html', 'client');
    api.add_files('client/partials/posts.html', 'client');

    // Views.
    api.add_files('client/views/post-list.html', 'client');
    api.add_files('client/views/post-list.ts', 'client');
    api.add_files('client/views/post-detail.html', 'client');
    api.add_files('client/views/post-detail.ts', 'client');
    api.add_files('client/views/login.html', 'client');
    api.add_files('client/views/login.ts', 'client');
    api.add_files('client/views/post-editor.html', 'client');
    api.add_files('client/views/post-editor.ts', 'client');
    api.add_files('client/index.html', 'client');

    // Code.
    api.add_files('client/config.ts', 'client');
    api.add_files('client/router.ts', 'client');
    api.add_files('client/global.ts', 'client');
    api.add_files('client/app.ts', 'client');

    //-----------------------
    // Server only.
    api.add_files('server/config.ts', 'server');
    api.add_files('server/collections.ts', 'server');
    api.add_files('server/methods.ts', 'server');
});

Package.on_test(function (api) {
    api.use('app-blog');
    api.use('tinytest');
});
