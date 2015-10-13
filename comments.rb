<% if (post._comments.length > 0) { %>
  <% for (var i=0; i < post._comments.length; i++){ %>

      <%= post._comments.models[i].attributes.body %>

  <% } %>
<% } %>
