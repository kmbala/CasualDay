Template.requestPanelHeading.helpers({
  editing_requestname: function () {
    return Session.get('editing_requestname');
  },
  editing_requestcustomer: function () {
    return Session.get('editing_requestcustomer');
  },
  editing_datedue: function () {
    return Session.get('editing_datedue');
  },
  customer: function () {
    var cust = Customers.findOne({_id: this.customer});
    if (cust && cust.name) {
      return cust;
    }
    return '';
  },
  customers: function () {
    return Customers.find();
  },
  isSelected: function (parent) {
    return this._id === parent.customer;
  }
})
Template.requestPanelHeading.events({
  'click .requestNameEdit': function (evt, tmpl) {
    Session.set('editing_requestname', true);
    Meteor.setTimeout(function () {
      $('.form-control.requestName').focus().select();
    }, 250);
  },
  'click .requestCustomerEdit': function (evt, tmpl) {
    Session.set('editing_requestcustomer', true);
    Meteor.setTimeout(function () {
      $('.form-control.requestCustomer').focus().select();
    }, 250);
  },
  'click .requestDateDue': function (evt, tmpl) {
    Session.set('editing_datedue', true);
    Meteor.setTimeout(function () {
      $('.dateDue').datepicker({
        onSelect: function (dateText) {
          Meteor.call('updateRequestDate', Session.get('active_request'), dateText);
          Session.set('editing_datedue', false);
        }
      });
    }, 1000)
  },

  'blur .customer': function (evt, tmpl) {
    Session.set('editing_requestcustomer', false);
  },
  'blur .requestName': function (evt, tmpl) {
    Session.set('editing_requestname', false);
  },
  'change .customer': function (evt, tmpl) {
    if (evt.target.value !== this.customer) {
      Meteor.call('updateRequestCustomer', Session.get('active_request'), evt.target.value);
      Session.set('editing_requestcustomer', false);
    }
  },
  'keyup .requestName': function (event, tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele = tmpl.find('.requestName');
      Meteor.call('updateRequestName', this._id, ele.value);
      Session.set('editing_requestname', false);
    }
  }
});
