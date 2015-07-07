Template.invited.helpers({
  'userList':function(){
    return Meteor.users.find({},{});
  },
  'invited':function(){
    var request = Requests.findOne({_id:Session.get('active_request')});
    return Meteor.users.find({_id:{$in:request.invited}});
  },
  'isowner':function(parent){
    return parent.userId === Meteor.userId();
  }
});
Template.invited.events({
  'click .inviteUser':function(evt,tmpl){
    var user = tmpl.find('#userToInvite').value;
    var project = Session.get('active_request');
    Meteor.call('inviteUser',request,user);
  },
  'click .removeUser':function(evt,tmpl){
    var user = this._id;
    var project = Session.get('active_request');
    Meteor.call('removeInvite',request,user);
  }
})
