# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_fname      | string    | not null
user_lname      | string    | not null
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
avatar_url      | text      | not null
birth_date      | string    | not null
birth_year      | string    | not null
gender          | string    | not null


## relationships
column name | data type | details
------------|-----------|-----------------------
user_id     | integer   | not null, foreign key (references users)
friend_id   | integer   | not null, foreign key (references users)


## relationships status:
## pending, accepted, declined, blocked
## status      | string    | not null
## action_user | integer   | not null



## profiles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
city        | string    | not null
state       | string    | not null


## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
body        | string    | not null






## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
post_id     | integer   | not null, foreign key (references posts)
tag_id      | integer   | not null, foreign key (references tags)
