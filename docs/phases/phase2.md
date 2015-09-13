# Phase 2: Viewing Profile and Posts

## Rails
### Models

### Controllers
Api::ProfileController (create, destroy, show)
Api::PostsController (create, destroy, show, update)

### Views
* profile/show.json.jbuilder

## Backbone
### Models
* Profile (parses nested `posts` association)
* Post

### Collections
* Profile
* Posts

### Views
* ProfileForm
* ProfileShow (composite view, contains PostsIndex subview)
* PostsIndex (composite view, contains PostsIndexItem subviews)
* PostsIndexItem
* PostShow

## Gems/Libraries
