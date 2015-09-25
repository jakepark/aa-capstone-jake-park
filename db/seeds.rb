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
  name_first: 'ellie', name_last: 'docter', password: 'password',
  birth_month: 'Feb', birth_day: '14', birth_year: '1936',
  gender: 'f')

u6 = User.create(email: 'russell@mail.com',
  name_first: 'russell', name_last: 'nagai', password: 'password',
  birth_month: 'Oct', birth_day: '17', birth_year: '2007',
  gender: 'm')

f1 = Friendship.create(user_id: 1, friend_id: 4, approved: false)
f2 = Friendship.create(user_id: 2, friend_id: 4, approved: false)
f3 = Friendship.create(user_id: 3, friend_id: 4, approved: false)
f4 = Friendship.create(user_id: 5, friend_id: 4, approved: false)
f5 = Friendship.create(user_id: 6, friend_id: 4, approved: false)


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


p1 = Post.create(user_id: 4, body: "Squirrel!")
p2 = Post.create(user_id: 4, body: 'I so ever do want the ball!')
p3 = Post.create(user_id: 4, body: 'Oh boy, a ball!')
p4 = Post.create(user_id: 4, body: 'My name is Dug. I have just met you, and I love you.')

p5 = Post.create(user_id: 3, body: 'Tell your boss he can have my house.')
p6 = Post.create(user_id: 3, body: "When I'm dead.")

p7 = Post.create(user_id: 6, body: 'I found the snipe!')
p8 = Post.create(user_id: 6, body: "Kevin's a GIRL?")
p9 = Post.create(user_id: 6, body: "But it's a TALKING DOG!")
p10 = Post.create(user_id: 6, body: 'A wilderness explorer is a friend to all.')

p11 = Post.create(user_id: 1, body: "Now, you must wear the cone of shame.")
p12 = Post.create(user_id: 1, body: "Why's he with that small mailman?")

p13 = Post.create(user_id: 2, body: "To infinity, and beyond!")
p14 = Post.create(user_id: 2, body: "¿Amigo? O enemigo?")
p15 = Post.create(user_id: 2, body: "I've set my laser from stun to kill.")
