Template.projectPanelHeading.helpers({
  editing_projectname: function () {
    return Session.get('editing_projectname');
  },
  editing_projectmember: function () {
    return Session.get('editing_projectmember');
  },
  editing_datedue: function () {
    return Session.get('editing_datedue');
  },
  member: function () {
    var cust = Members.findOne({_id: this.member});
    if (cust && cust.name) {
      return cust;
    }
    return '';
  },
  members: function () {
    return Members.find();
  },
  isSelected: function (parent) {
    return this._id === parent.member;
  }
})
Template.projectPanelHeading.events({
  'click .projectNameEdit': function (evt, tmpl) {
    Session.set('editing_projectname', true);
    Meteor.setTimeout(function () {
      $('.form-control.projectName').focus().select();
    }, 250);
  },
  'click .projectMemberEdit': function (evt, tmpl) {
    Session.set('editing_projectmember', true);
    Meteor.setTimeout(function () {
      $('.form-control.projectMember').focus().select();
    }, 250);
  },
  'click .projectDateDue': function (evt, tmpl) {
    Session.set('editing_datedue', true);
    Meteor.setTimeout(function () {
      $('.dateDue').datepicker({
        onSelect: function (dateText) {
          Meteor.call('updateProjectDate', Session.get('active_project'), dateText);
          Session.set('editing_datedue', false);
        }
      });
    }, 1000)
  },

  'blur .member': function (evt, tmpl) {
    Session.set('editing_projectmember', false);
  },
  'blur .projectName': function (evt, tmpl) {
    Session.set('editing_projectname', false);
  },
  'change .member': function (evt, tmpl) {
    if (evt.target.value !== this.member) {
      Meteor.call('updateProjectMember', Session.get('active_project'), evt.target.value);
      Session.set('editing_projectmember', false);
    }
  },
  'keyup .projectName': function (event, tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele = tmpl.find('.projectName');
      Meteor.call('updateProjectName', this._id, ele.value);
      Session.set('editing_projectname', false);
    }
  }
});
