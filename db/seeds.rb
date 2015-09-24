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

# create_table "posts", force: :cascade do |t|
#   t.text     "body",                     null: false
#   t.integer  "user_id",                  null: false
#   t.float    "ord",        default: 0.0
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end

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


p1 = Post.create(user_id: 4, body: 'Post 1 from Dug.')
p2 = Post.create(user_id: 4, body: 'Post 2 from Dug.')
p3 = Post.create(user_id: 4, body: 'Post 3 from Dug.')
p4 = Post.create(user_id: 4, body: 'Post 4 from Dug.')

p5 = Post.create(user_id: 3, body: 'Post 1 from Carl.')
p6 = Post.create(user_id: 3, body: 'Post 2 from Carl.')
p7 = Post.create(user_id: 3, body: 'Post 3 from Carl.')

p8 = Post.create(user_id: 6, body: 'Post 1 from Russell.')
p9 = Post.create(user_id: 6, body: 'Post 2 from Russell.')
p10 = Post.create(user_id: 6, body: 'Post 3 from Russell.')
