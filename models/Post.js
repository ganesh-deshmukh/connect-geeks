const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema-structure to store posts.
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users" // refering to users collection
  },
  text: {
    type: String,
    required: true
  },

  // if users wants to delete their account, their post should not be deleted, as post can be imp.

  // automatically each post will show name and gravator of user
  name: {
    type: String
  },
  avator: {
    type: String
  },
  likes:
    // likes is not just a number, we should show who liked post.
    [
      {
        // if user likes post then user's ID is stored in likes array, to show who liked this post.
        user: {
          type: Schema.Types.ObjectId,
          ref: "users"
        }
      }
    ],
  comments: [
    {
      // commments will have details of sender or name+avator of Commentator.

      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avator: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  // post also have date of posting
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
