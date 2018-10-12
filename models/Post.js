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
  }

  // if users wants to delete their account, their post should not be deleted, as post can be imp.
});
