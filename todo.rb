git config --local user.name 'Jake Park'
git config --local user.email 'jake.park@caa.columbia.edu'

fix api/users displaying all the things  -- FIXED


http://stackoverflow.com/questions/16001586/change-the-no-file-chosen

# <form action="/api/#{current_user.id}">
#   <li><input class: "button_user_home" type="submit" value="Home" > </li>
# </form>

http://stackoverflow.com/questions/18721054/link-with-2-lines-text-and-image

BUGS!

When friend approve button is clicked, the page doesnt refresh.
When new user signs up, a blank entity is added to the index of users. However,
hard page refresh fixes problem.

CREATE is done..

DELETE posts DONE
UPDATE posts NEXT TIME

CSS styling. REDID SOME NESTED DIVS

.data(post.get('id'))


def friends_posts
  Post.find_by_sql(<<-SQL)
    SELECT
      *,
      posts.id AS posts_id

    FROM
      posts
    JOIN
      friendships
    ON
      posts.user_id = friendships.user_id
    WHERE
      (friendships.approved = true) AND (friendships.friend_id = #{self.id})
  SQL
end

#{self.id})
OR posts.user_id = friendships.friend_id



SELECT
  *
FROM
  posts
JOIN
  friendships
ON
  posts.user_id = friendships.user_id
WHERE
  (friendships.approved = true)
      AND
    ((friendships.friend_id = 4)
      OR
    (friendships.user_id = 4))



    SELECT
      *
    FROM
      posts
    JOIN
      friendships
    ON
      posts.user_id = friendships.user_id

    JOIN
      (

      SELECT
        *
      FROM
        posts
      JOIN
        friendships
      ON
        posts.user_id = friendships.friend_id
      ) AS other_posts
