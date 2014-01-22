declare var Accounts;
declare var marked;

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

// marked.
marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});
