Clothes = new Mongo.Collection('clothes');
if (Meteor.isClient) {

  Template.body.helpers({
      clothes: function(){
        if (Session.get('hideFinished')){
          return Clothes.find({checked: {$ne: true}});
        }else{
          return Clothes.find();
        }
      },
      hideFinished: function(){
        return Session.get('hideFinished');
      }
  });
  Template.body.events({
    'submit .new-clothe': function(event){
      var title = event.target.title.value;

      Meteor.call("addClothes", title)

      event.target.title.value="";
      return false;
    },
    'change .hide-finished': function(event){
      Session.set('hideFinished', event.target.checked)

    }
  });
  Template.clothe.events({
    'click .toggle-checked': function(){
      Meteor.call("updateClothes",this._id, !this.checked);
    },
    "click .delete": function(){
      Meteor.call("removeClothes",this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  addClothes: function(title){
    Clothes.insert({
      title: title,
      createdAt: new Date()
    });
  },
  updateClothes: function(id, checked){
    Clothes.update(id, {$set:{checked: checked}});
  },
  removeClothes: function(id){
    Clothes.remove(id);
  }


});
