Meteor.startup(function() {

  Meteor.Mailgun.config({
    username: 'postmaster@domain.com',
    password: 'password-goes-here'
  });

  Meteor.methods({
    'sendContactEmail': function(name, email, message) {
      this.unblock();

      Meteor.Mailgun.send({
        to: 'recipient@example.com',
        from: name + ' <' + email + '>',
        subject: 'New Contact Form Message',
        text: message,
        html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: email, message: message})
      });
    },
    'saveProject': function(project){
      check(project.name, String);
      project.userId = Meteor.userId();
      project.dateentered = new Date();
      project.lastupdate = new Date();
      if(!project.datedue){

        project.datedue = new Date();
      }
      if(!project.customer){

        project.customer = Customers.findOne({})._id;
      }
      project.invited = [];
      return Projects.insert(project);
    }
  });
});
