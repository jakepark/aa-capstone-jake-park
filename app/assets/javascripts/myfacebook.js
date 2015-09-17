window.myfacebook = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    new myfacebook.Routers.Router({
      $rootEl: $("#main")
    })
    Backbone.history.start();
  
  }
};

$(document).ready(function(){
  myfacebook.initialize();


})
