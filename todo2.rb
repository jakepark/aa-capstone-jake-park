

# Selects all the posts, with null values OMG IT WORKS
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

#Defaults to left INNER join! so it misses the nulls
SELECT
	*
FROM
	posts
JOIN
	friendships
	ON
	posts.user_id = friendships.user_id



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
