const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
    token: {
      type: String,
      required: false
    },
    sex: {
      type: String,
      required: false
    },
    age: {
      type: Number,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    photo: {
      data: Buffer,
      contentType: String,
      required: false
    },
    googlePhoto: {
      type: String,
      require: true
    },
    creation_date: {
      type: Date,
      required: true
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true
    },
    isGoogleAccount: {
      type: Boolean,
      required: true
    },
    isPremium: {
      type: Boolean,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: false
    },
    games: [
      {
        name: {
          type: String,
          required: false
        },
        total_missions: {
          type: Number,
          required: false
        },
        current_mission: {
          type: Number,
          required: false
        },
        date: {
          type: Date,
          required: false
        },
        updates: [
          {
            new_mission: {
              type: Number,
              required: false
            },
            date: {
              type: Date,
              required: false
            }
          }
        ]
      }
    ]
  },
  { collection: "user" }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
