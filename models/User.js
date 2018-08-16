const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Schema is property/function in module-mongooge
// same as const router = express.Router();

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    // if avator present at server then it returns otherwise it uses default placeholder.
    type: String
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// module.exports = Variable = mongoose.model("name_we_wanted_to_use", nameOfSchema);
module.exports = User = mongoose.model("users", UserSchema);
