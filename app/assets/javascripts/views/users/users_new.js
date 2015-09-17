myfacebook.Views.UsersNew = Backbone.View.extend({

  template: JST['users/new'],

  events: {
    "submit form": "submit",
    "change #input-post-image": "fileInputChange"
  },

  initialize: function(){
    this.model = new myfacebook.Models.User();
    this.model.collection = this.collection;
  },

  render: function(){
    var html = this.template();

    this.$el.html(html);
    return this;
  },

  submit: function(event){
    event.preventDefault();

    var title = this.$("#input-post-title").val();
    var file = this.$("#input-post-image")[0].files[0];

    var formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[image]", file);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(){
        that.collection.add(that.model);
        Backbone.history.navigate("", { trigger: true });
      }
    });
  },

  fileInputChange: function(event){
    console.log(event.currentTarget.files[0]);

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src);
  }

});
