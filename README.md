# myfacebook

[Heroku link][heroku]

[heroku]: http://myfacebook-jp.herokuapp.com

## Minimum Viable Product
myfacebook is a clone of Facebook built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create user account (sign up)
- [x] Create sessions (log in)
- [x] Create profile
- [x] Upload user avatar
- [x] View profiles
- [x] Send Friend request
- [x] Approve Friend
- [x] Deny Friend
- [x] Remove Friend
- [x] View Friend profile
- [x] Create profile posts
- [x] View Friend's posts as Newsfeed

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Profile Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create profiles
using a simple text form in a Rails view. The most important part of this phase
will be pushing the app to Heroku and ensuring that everything works before
moving on to phase 2.

[Details][phase-one]

### Phase 2: Viewing Profiles (~1 days)
I will add API routes to serve profile data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to update profiles and view profiles, inside the
Backbone frontend.

[Details][phase-two]

### Phase 3: Adding and Approving Friends (~3 days)
I will add friends, and present a user with a choice whether to
approve or deny the pending request. Thereupon the authenticated user will be
authorized to view the friend's profile. By default, a user's profile will be
set to private.

[Details][phase-three]

### Phase 4: User Feeds (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`subscribed_profiles` association to serve a list of profile posts ordered
chronologically. On the Backbone side, I'll make a `FeedShow` view whose `posts`
collection fetches from the new route.  Ultimately, this will be the page users
see after logging in.

[Details][phase-four]



[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
