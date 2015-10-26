// from index.jst.ejs

<ul class='index-posts group'>
  <% posts.each(function (post) { %>

    <div class="index-post">
      <div class="index-author group">
        <a href='#/users/<%= post.escape('author_id') %>'>

  <% if (users.length != 0) { %>

        <% var author = users.where({id: parseInt(post.escape('author_id'))}) %>

        <img class="index-author-preview" src="<%-author[0].attributes['image_url']%>"></img></a>

        <a class="index-author-preview-name" href='#/users/<%- post.escape('author_id') %>'>

          <%- author[0].attributes['name_first'] %>
          <%- author[0].attributes['name_last'] %>

        </a>

        <p>
          <% var date = new Date(post.escape('posts_created_at')) %>
          <%= date.toLocaleDateString() %>
          at
          <%= date.toLocaleTimeString() %>
        </p>


  <% } %>

      </div>


      <li><%- post.get('body') %></li>

    </div>

  <% }); %>
</ul>












// from show.jst.ejs
<!-- -->
