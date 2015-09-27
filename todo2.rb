
SELECT
*, posts.id AS posts_id
FROM
posts
JOIN
friendships
ON
posts.user_id = friendships.user_id
WHERE
((posts.user_id != 4 AND friendships.approved = true)
AND
(friendships.friend_id = 4))
OR
((posts.user_id != 4 AND friendships.approved = true)
AND
(friendships.user_id = 4))
UNION ALL
SELECT
*, posts.id AS posts_id
FROM
posts
JOIN
friendships
ON
posts.user_id = friendships.friend_id
WHERE
((posts.user_id != 4 AND friendships.approved = true)
AND
(friendships.user_id = 4))
OR
((posts.user_id != 4 AND friendships.approved = true)
AND
(friendships.friend_id = 4))
#
#
# # very close
# SELECT
# *
# FROM
# posts
# JOIN
# friendships
# ON
# posts.user_id = friendships.user_id
# WHERE
# posts.user_id != 4 AND friendships.approved = true
# UNION ALL
# SELECT
# *
# FROM
# posts
# JOIN
# friendships
# ON
# posts.user_id = friendships.friend_id
# WHERE
# posts.user_id != 4 AND friendships.approved = true
# #

#this isn't working to exclude user id =6 ???
SELECT
*
FROM
posts
JOIN
friendships
ON
posts.user_id = friendships.user_id
UNION ALL
SELECT
*
FROM
posts
JOIN
friendships
ON
posts.user_id = friendships.friend_id

WHERE
posts.user_id != 4;


# UNION ALL . ALL POSTS WITH FRIENDSHIPS ASSOC.

SELECT
*
FROM
posts
JOIN
friendships
ON
posts.user_id = friendships.user_id
UNION ALL
SELECT
*
FROM
posts
JOIN
friendships
ON
posts.user_id = friendships.friend_id

#

# maybe incorrect.. maybe another step needed
SELECT
*
FROM
	posts
LEFT OUTER JOIN
	friendships AS friend1
	ON
	posts.user_id = friend1.friend_id
LEFT OUTER JOIN
	friendships AS friend2
ON
	friend2.user_id = friend1.friend_id
WHERE

(posts.user_id != 4
AND
	friend1.approved = true
AND
	friend1.user_id = 4)
OR
	friend1.approved = true AND friend1.friend_id = 4

(


)
(friendships.approved = true)
OR
(friendships.approved = true AND friendships.friend_id = 6)
OR
(friendships.approved = true AND friendships.user_id = 6)
# looking good

# SELECT
# 	posts.id, posts.body, posts.user_id,
# 	friend1.id, friend1.user_id, friend1.friend_id,
# 	friend2.id, friend2.user_id, friend2.friend_id
SELECT
*
FROM
	posts
LEFT OUTER JOIN
	friendships AS friend1
	ON
	posts.user_id = friend1.friend_id
LEFT OUTER JOIN
	friendships AS friend2
ON
	friend2.user_id = friend1.friend_id

# # I need the combination of the following two tables!
#
# SELECT
# 	*
# FROM
# 	posts
# LEFT OUTER JOIN
# 	friendships AS friend1
# 	ON
# 	posts.user_id = friend1.friend_id
#
# SELECT
# 	*
# FROM
# 	posts
# LEFT OUTER JOIN
# 	friendships AS friend2
# 	ON
# 	posts.user_id = friend2.user_id
#
# 	# NEED THE ABOVE TWO TABLES #


# Selects all the posts, with null values bugged for russell = 6
# ok, for this one i need the
#	friendships join on posts.user_id = friendships.friend_id
SELECT
	*, posts.id AS posts_id

SELECT
	*
FROM
	posts
LEFT OUTER JOIN
	friendships
	ON
	posts.user_id = friendships.friend_id

WHERE
	posts.user_id != 6

	AND (



	)
	(friendships.approved = true)
OR
	(friendships.approved = true AND friendships.friend_id = 6)
OR
	(friendships.approved = true AND friendships.user_id = 6)


# Selects all the posts, with null values OMG IT WORKS. for dug =4
#	friendships join on posts.user_id = friendships.user_id

SELECT
	*, posts.id AS posts_id
FROM
	posts
LEFT OUTER JOIN
	friendships
	ON
	posts.user_id = friendships.user_id

WHERE
	(friendships.approved = true AND posts.user_id != 4)
OR
	(friendships.approved = true AND friendships.friend_id = 4)

# # ERROR! WRONG
# #Defaults to left INNER join! so it misses the nulls
# SELECT
# 	*
# FROM
# 	posts
# JOIN
# 	friendships
# 	ON
# 	posts.user_id = friendships.user_id
#


#doesn't work, below. problem is friendships.friend_id
#
# SELECT
# 	*
# FROM
# 	posts
# JOIN
# 	friendships
# 	ON
# 	posts.user_id = friendships.friend_id
# WHERE
# 	(friendships.approved = true) AND
# 	(posts.user_id != 4)
