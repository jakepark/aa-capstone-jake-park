myfacebook.Views.SignUp = Backbone.View.extend({

  initialize: function(options){

    this.listenTo(this.model, "sync change", this.render);
    this.callback = options.callback;
    this.listenTo(myfacebook.currentUser, "signIn", this.signInCallback);
  },

  template: JST['users/sign_up'],

  events: {
    "submit #form_sign_up": "submit",
    "submit #log_in_guest": "submitsignIn"
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
        alert("Please choose another email and a password greater than 8 characters.");
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
