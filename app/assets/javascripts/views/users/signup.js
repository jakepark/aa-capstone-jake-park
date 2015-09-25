myfacebook.Views.SignUp = Backbone.View.extend({

  initialize: function(options){

    this.listenTo(this.model, "sync change", this.render);
    this.callback = options.callback;
    this.listenTo(myfacebook.currentUser, "signIn", this.signInCallback);
  },

  template: JST['users/sign_up'],

  events: {
    "submit form": "submit"
  },

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html).addClass('content-container group');

    return this;
  },

  submit: function(event){
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;

    var model = this.collection.getOrFetch(this.model.id)
    model.set(userData);

    model.save({}, {
      success: function(){
        myfacebook.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("", { trigger: true })
      },
      error: function(data){
        alert("Form invalid.");
        console.log(data);
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


// //this re-renders index page on sign in
//
// event.preventDefault();
//
// var $form = $(event.currentTarget);
// var userData = $form.serializeJSON().user;
// var that = this;
//
// var model = new myfacebook.Models.User()
//
// model.set(userData);
//
// model.save({}, {
