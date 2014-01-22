declare var Accounts;
declare var marked;
declare var _;

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

// marked.
var renderer = new marked.Renderer();

marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

renderer.table = function(header, body) {
    return _.str.sprintf(
        '<table class="table table-bordered">' +
            '<thead>%s</thead>' +
            '<tbody>%s</tbody>' +
        '</table>',
        header,
        body
    );
};
