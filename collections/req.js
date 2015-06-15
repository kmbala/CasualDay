Requests = new Mongo.Collection('requests');
Requests.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }

});
