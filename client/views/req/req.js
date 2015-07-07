Template.req.rendered = function() {
  $('[data-toggle="popover"]').popover()
  this.$('.date').datepicker();


};

Template.req.helpers({
  tables: function(){
    var countChr = 300;
    var used = 5;
     return countChr - used;
  },

    requests: function(){
      return Requests.find();
    },
    requestToDelete:function(){
      return Session.get('requestToDelete');
    }


});
Template.deleconfirm.events({
  'click .deleteConfirmed':function(evt,tmpl){
    Meteor.call('removeRequest',Session.get('requestToDelete'));
    Session.set('requestToDelete',null);
  }
})
Template.req.events({

  'click .tableCheck':function(event){
    var numChair = 300;
    console.log(numChair);


  },
  'submit form': function(event){
    event.preventDefault();
    var first = event.target.firstName.value;
    var last = event.target.lastName.value;
    var Event = event.target.Event.value;
    var date = event.target.date.value;
    var time = event.target.time.value;

    var email = event.target.email.value;
    Requests.insert({
      first: first,
      last: last,
      date: date,
      time: time,
      Event: Event,
      email: email


    });
    event.target.firstName.value ="";
    event.target.lastName.value = "";
    event.target.date.value = "";
    event.target.time.value="";
    event.target.require.value="";
    event.target.Event.value = "";
    event.target.email.value="";
    return false;
    console.log("got it");
    console.log(event.type);
    Meteor.call('saveRequest',request);
  },
  'click .deleteConfirmation':function(evt,tmpl){
    evt.preventDefault();
    evt.stopPropagation();
    Session.set('requestToDelete',this._id);
  },
  'click .cancelDelete':function(){
    return Session.set('requestToDelete',null);
  }
});
Template.requestView.helpers({
  editing_calevent:function(){
    return Session.get('editing_calevent');
  },
  adding_conversation:function(){
    return Session.get('adding_conversation');
  },
  adding_todo:function(){
    return Session.get('adding_todo');
  }
})
