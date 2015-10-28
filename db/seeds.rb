u1 = User.create(email: 'alpha@mail.com',
  name_first: 'alpha', name_last: 'dog', password: 'password',
  birth_month: 'Jan', birth_day: '1', birth_year: '2010',
  gender: 'm')

u2 = User.create(email: 'buzz@mail.com',
  name_first: 'buzz', name_last: 'lightyear', password: 'password',
  birth_month: 'Feb', birth_day: '1', birth_year: '1995',
  gender: 'm')

u3 = User.create(email: 'carl@mail.com',
  name_first: 'carl', name_last: 'fredricksen', password: 'password',
  birth_month: 'Mar', birth_day: '1', birth_year: '1931',
  gender: 'm')

u4 = User.create(email: 'dug@mail.com',
  name_first: 'dug', name_last: 'fredricksen', password: 'password',
  birth_month: 'Apr', birth_day: '1', birth_year: '2010',
  gender: 'm')

u5 = User.create(email: 'ellie@mail.com',
  name_first: 'ellie', name_last: 'fredricksen', password: 'password',
  birth_month: 'Feb', birth_day: '14', birth_year: '1931',
  gender: 'f')

u6 = User.create(email: 'russell@mail.com',
  name_first: 'russell', name_last: 'nagai', password: 'password',
  birth_month: 'Oct', birth_day: '17', birth_year: '2007',
  gender: 'm')

f1 = Friendship.create(user_id: 1, friend_id: 4, approved: false)
f2 = Friendship.create(user_id: 2, friend_id: 4, approved: true)
f3 = Friendship.create(user_id: 3, friend_id: 4, approved: true)
f4 = Friendship.create(user_id: 5, friend_id: 4, approved: true)
f5 = Friendship.create(user_id: 6, friend_id: 4, approved: true)


# oh ruby, it needs bind and sendthis method..
# idx = 1
# posts = []
# users = ["Dug", "Russell", "Carl"]
# while idx <= 3
#   idx_u = 0
#   while idx_u < 3
#     post = Post.create(user_id: idx, body: "Post #{idx} from #{users[idx]}")
#
#     posts << post
#     idx_u += 1
#   end
#   idx += 1
#   return posts
# end

p1 = Post.create(user_id: 1, body: "Why's he with that small mailman?", created_at: "2015-10-04T20:11:11.158Z")
p2 = Post.create(user_id: 1, body: "Now, you must wear the cone of shame.", created_at: "2015-10-06T20:11:11.158Z")

p3 = Post.create(user_id: 2, body: "I've set my laser from stun to kill.", created_at: "2015-09-03T20:11:11.158Z")
p4 = Post.create(user_id: 2, body: "¿Amigo? O enemigo?", created_at: "2015-10-08T20:11:11.158Z")
p5 = Post.create(user_id: 2, body: "To infinity, and beyond!", created_at: "2015-10-03T20:11:11.158Z")

p6 = Post.create(user_id: 3, body: 'Tell your boss he can have my house.', created_at: "2015-10-03T20:11:10.158Z")

p7 = Post.create(user_id: 4, body: 'Oh boy, a ball!', created_at: "2015-10-04T20:11:15.158Z")
p8 = Post.create(user_id: 4, body: 'My name is Dug. I have just met you, and I love you.', created_at: "2015-10-06T20:07:17.158Z")

p9 = Post.create(user_id: 6, body: 'I found the snipe!', created_at: "2015-10-02T20:11:17.158Z")
p10 = Post.create(user_id: 6, body: "Kevin's a GIRL?", created_at: "2015-10-04T20:11:17.158Z")
p11 = Post.create(user_id: 6, body: 'A wilderness explorer is a friend to all.', created_at: "2015-10-07T25:10:17.158Z")

c1 = Comment.create(user_id: 3, post_id: 6, body: "When I'm dead.", created_at: "2015-10-03T20:11:17.158Z")
c2 = Comment.create(user_id: 6, post_id: 8, body: "Can we keep him?", created_at: "2015-10-06T20:09:17.158Z")
c3 = Comment.create(user_id: 3, post_id: 8, body: "No.", created_at: "2015-10-06T20:10:17.158Z")
c4 = Comment.create(user_id: 6, post_id: 8, body: "But it's a TALKING DOG!", created_at: "2015-10-06T20:11:17.158Z")
c5 = Comment.create(user_id: 4, post_id: 8, body: "Squirrel!", created_at: "2015-10-06T20:12:17.158Z")

c6 = Comment.create(user_id: 4, post_id: 7, body: 'I so ever do want the ball!', created_at: "2015-10-04T20:11:17.158Z")
