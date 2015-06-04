Template.roles.helpers({
  userList:function(){
    return Meteor.users.find();
  }
});
Template.roles.events({

});


Template.role.events({
  'change #viewmembers':function(evt,tmpl){
    if(evt.target.checked){
      Meteor.call('addToRole',this._id,'view-members','');
    } else{
      Meteor.call('removeFromRole',this._id,'view-members','')
    }
    console.log(evt.target.checked);
  },
  'change #editmembers':function(evt,tmpl){
    if(evt.target.checked){
      Meteor.call('addToRole',this._id,'edit-members','');
    }else{
      Meteor.call('removeFromRole',this._id,'edit-members','')
    }
  },
  'change #viewprojects':function(evt,tmpl){
    if(evt.target.checked){
      Meteor.call('addToRole',this._id,'view-projects','');
    }else{
      Meteor.call('removeFromRole',this._id,'view-projects','')
    }
  },
  'change #editprojects':function(evt,tmpl){
    if(evt.target.checked){
      Meteor.call('addToRole',this._id,'edit-projects','');
    }else{
      Meteor.call('removeFromRole',this._id,'edit-projects','')
    }
  }
})
