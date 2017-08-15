const mongoose = require('mongoose');

const BlogPostsSchema = new mongoose.Schema({
  user: { type: String },
  title: { type: String },
  contents: { type: String },
  date: { type: Date,
          default: Date.now,
        },
});

module.exports = mongoose.model('BlogPosts', BlogPostsSchema);

// Implement a second collection called `BlogPosts`.  Implement the following routes:
// * [POST] `/posts` This route should save a new blog post to the server.
// * [GET] `/posts` This route will return an array of all blog posts.
// * [GET] `/posts/:id` This route will return the blog post with the matching `id` property.
// * [DELETE] `/posts/:id` This route should delete the specified blog post.
// Your user objects can take any form.
