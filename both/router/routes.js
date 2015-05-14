Router.route('/', {
  name: 'home'
});

Router.route('/members', {
  name: 'members'
});

Router.route('/archives', {
  name: 'archives'
});

Router.route('/roles', {
  name: 'roles'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
