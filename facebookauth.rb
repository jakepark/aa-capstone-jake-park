Omniauth;

Makes a request to Facebook,
tells who the app is (register with Facebook)
Give app information you as a user.
Gives details to that app for that account. Go to facebook

gem 'omniauth-facebook' ## or twitter
bundle install

register app with facebook;

config/initializers.
Gets run automatically once when app is started

create:
'omniauth.rb'  // UPLOAD THIS

paste:
Rails.application.config.middleware.use OmniAuth::Builder do
  (get info from gem page)
end
developers.facebook.com

myApps; create new App; not a test app
skip tour
'application.yml'  // NEVER UPLOAD THIS

FACEBOOK_KEY : etc
FACEBOOK_SECRET : etc

link on facebook redirects back to our app.. Facebook needs to know where to
redirect..
Facebook Dev
>settings > whitelist
Valid OAuth redirect URIs
http://localhost:3000
http://google.com
SAVE !!

put link on sign in page:
'sign_in.jst.ejs'

<a href = "/auth/facebook"> Log in with the FACEBOOK! </a>

Route in app; path, not backbone route (no pound sign), regular link; set up
by omniauth gem!

When Facebook redirects back;

'routes.rb'

#get "/auth/facebook/callback", to: "api/sessions#omniauth"
get "/auth/:provider/callback", to: "api/sessions#omniauth"

Sessions method
              # plural sessions, controller name

'sessions_controller.rb'

def omniauth
  # fail #temporary
  user = User.find_or_create_by_auth_hash(omniauth_hash)

  sign_in!(user)
  # render :show   # would only send back json maybe

  redirect_to root_url + "/#users"
end

private

def omniauth_hash
  request.env["omniauth.auth"]
end


:provider, :uid # only required keys by Omniauth standard.


'user.rb'

def self.find_or_create_by_auth_hash(auth_hash)
  user = User.find_by(
    uid: auth_hash[:uid],
    provider: auth_hash[:provider]
  )

  unless user
    user = User.create!(
      uid: auth_hash[:uid],
      provider: auth_hash[:provider],
      first_name: auth_hash[:info][:name].split(" ").first,
      last_name: auth_hash[:info][:name].split(' ").last"'),
      # DO NOT TAKE EMAIL
      email: auth_hash[:info][:name],
      password: SecureRandom.urlsafe_base64(16)
    )
  end
end

ADD COLUMNS (UID, PROVIDER)

rails g migration add_uid_and_provider_to_users uid:string, provider:string

Facebook always sends back this extra piece
Add to routes.js:
routes: {
  "_=_": "index"
}

currentUser hasnt been fetched yet. SIgn in view:


this.listenTo(BackboneAuthDemo.currentUser, "signIn", this.callback)  # alittle wrong
