Template.dashboard.rendered = function() {

};
Template.dashboard.events({'keyup input[type=text]': function(event,tmpl){
  if(event.which === 27 || event.which ===13){
    event.preventDefault();
    var project = {};
    project.name = tmpl.find('#projectNameEnter').value;
    Meteor.call('saveProject',project);
  }
  }
})
