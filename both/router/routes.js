Router.route('/', {
  name: 'home'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});

Router.route('/about', {
  name: 'about'
});

