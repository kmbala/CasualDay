Router.route('/', {
  name: 'home'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});

Router.route('/aboutus', {
  name: 'aboutus'
});

Router.route('/contactus', {
  name: 'contactus'
});
