const { model, Schema } = require("mongoose");

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    skills: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    linkedIn: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
  },
  { versionKey: false, timestamp: true }
);

const Admin = model("Admin", AdminSchema);
module.exports = { Admin };
