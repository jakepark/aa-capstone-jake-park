if (
    user.friends().findWhere({
      user_id: user.get('id'),
      friend_id: myfacebook.currentUser.get('id') })
      ||
    user.friends().findWhere({
      user_id: myfacebook.currentUser.get('id'),
      friend_id: user.get('id') })
      ||
    myfacebook.currentUser.friends().findWhere({
      user_id: user.get('id'),
      friend_id: myfacebook.currentUser.get('id') })
      ||
    myfacebook.currentUser.friends().findWhere({
      user_id: myfacebook.currentUser.get('id'),
      friend_id: user.get('id') })
  ) {

  }
