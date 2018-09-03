const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Schema is property/function in module-mongoose

// create profile schema specifing what contents to inclued in table=collection
const ProfileSchema = new Schema({
  // associate user with profile- store details in profile model
  // but import some details from user
  user: {
    type: Schema.Types.ObjectId,
    ref: "users" //collection rerence to import data from users collection to profile info
  },
  handle: {
    // seo friendly url, handle=name in url
    type: String,
    required: true,
    // we have already done validation
    max: 40
  },
  company: {
    type: String,
    required: false // students can't have companies
  },
  website: {
    type: String // not required always
  },
  location: {
    type: String
  },
  status: {
    // options like developer, student, trainer
    type: String,
    required: true
  },
  skills: {
    // comma separeted values, csv and then store as array.
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String,
    required: false
  },
  experience: [
    // array of objects
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
        // required: true
        // choose from checkbox
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  // add education also
  education: [
    // array of objects
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
        // required: true
        // choose from checkbox
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  // add social media account links
  social: {
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    },
    stackoverflow: {
      type: String
    },
    facebook: {
      type: String
    },
    youtube: {
      type: String
    }
  },

  // add current date of joining
  date: {
    type: Date,
    default: Date.now
  }
});
