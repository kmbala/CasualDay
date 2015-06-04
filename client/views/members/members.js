Template.members.helpers({
  members: function () {
    return Members.find();
  }
});


Template.members.events({
  'keyup .membername': function(event,tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
      Meteor.call('addMember',tmpl.find('.membername').value);
      var ele =  tmpl.find('.membername');
      ele.value = '';
      ele.focus();
    }
  },
  'click .editMemberName':function(evt,tmpl){
    Session.set('editing_membername',this._id);
    Meteor.setTimeout(function(){
      $('.form-control.name').focus().select();
    },250);

  },
  'click .editMemberPhone':function(evt,tmpl){
    Session.set('editing_memberphone',this._id);
    Meteor.setTimeout(function(){
      $('.form-control.phone').focus().select();
    },250);

  },
  'click .editMemberContact':function(evt,tmpl){
    Session.set('editing_membercontact',this._id);
    Meteor.setTimeout(function(){
      $('.form-control.contact').focus().select();
    },250);

  }
});
Template.member.helpers({
  editingMembername:function(){
    return Session.equals('editing_membername',this._id);
  },
  editingMemberphone:function(){
    return Session.equals('editing_memberphone',this._id);
  },
  editingMembercontact:function(){
    return Session.equals('editing_membercontact',this._id);
  }
})
Template.member.events({
  'click .delmember': function () {
    Meteor.call('removeMember', this._id);
  },
  'blur .name': function(event,tmpl) {
    Session.set('editing_membername',null);
  },
  'blur .phone': function(event,tmpl) {

    Session.set('editing_memberphone',null);
  },
  'blur .contact': function(event,tmpl) {
    Session.set('editing_membercontact',null);
  },
  'keyup .name': function(event,tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele =  tmpl.find('.name');
      Meteor.call('updateMemberName',this._id,ele.value);
      Session.set('editing_membername',null);
    }
  },
  'keyup .phone':function(event,tmpl){
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele =  tmpl.find('.phone');
      Meteor.call('updateMemberPhone',this._id,ele.value.replace('(','').replace(')',''));
      Session.set('editing_memberphone',null);
    }
  },
  'keyup .contact':function(event,tmpl){
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele =  tmpl.find('.contact');
      Meteor.call('updateMemberContact',this._id,ele.value);
      Session.set('editing_membercontact',null);
    }
  }
});
