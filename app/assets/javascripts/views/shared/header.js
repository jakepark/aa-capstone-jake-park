myfacebook.Views.Header = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(myfacebook.currentUser, "signIn signOut", this.render);
    this.listenTo(myfacebook.currentUser, "signIn", this.signInCallback);
    this.listenTo(this.model, 'sync', this.render)
    this.render();
  },

  events: {
    "click #sign-out-link": "signOut",
    "submit form": "submitsignIn"
  },

  template: JST['shared/header'],

  render: function(){
    var html = this.template({ currentUser: myfacebook.currentUser });
    this.$el.html(html);

    return this;
  },

  signOut: function(event){
    event.preventDefault();
    myfacebook.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("session/new", { trigger: true });
      }
    });
  },

  submitsignIn: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    myfacebook.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },


    signInCallback: function(event){
      if(this.callback) {
        this.callback();
      } else {
        Backbone.history.navigate("", { trigger: true });
      }
    }

});
