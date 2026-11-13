const { Schema, model } = require("mongoose");

const URL_REGEX = /^https?:\/\/.+/;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must be at most 100 characters"],
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase letters, numbers, and hyphens only (e.g. my-project)",
      ],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [300, "Description must be at most 300 characters"],
    },

    longDescription: {
      type: String,
      trim: true,
      maxlength: [5000, "Long description must be at most 5000 characters"],
    },

    thumbnail: {
      type: String,
      trim: true,
      match: [URL_REGEX, "Thumbnail must be a valid URL starting with http:// or https://"],
    },

    liveUrl: {
      type: String,
      trim: true,
      match: [URL_REGEX, "Live URL must be a valid URL starting with http:// or https://"],
    },

    frontendGithub: {
      type: String,
      trim: true,
      match: [URL_REGEX, "Frontend GitHub URL must be a valid URL starting with http:// or https://"],
    },

    backendGithub: {
      type: String,
      trim: true,
      match: [URL_REGEX, "Backend GitHub URL must be a valid URL starting with http:// or https://"],
    },

    technologies: {
      type: [{ type: String, trim: true }],
      required: [true, "Technologies are required"],
      validate: [
        {
          validator: (arr) => arr.length >= 1,
          message: "At least one technology is required",
        },
        {
          validator: (arr) => arr.every((t) => t.length >= 1 && t.length <= 50),
          message: "Each technology must be between 1 and 50 characters",
        },
      ],
    },

    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: ["In Progress", "Completed", "On Hold", "Archived"],
        message: "Status must be one of: In Progress, Completed, On Hold, Archived",
      },
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    completionDate: {
      type: Date,
      validate: {
        validator: function (value) {
          // Only validate if both dates exist
          if (!value || !this.startDate) return true;
          return value >= this.startDate;
        },
        message: "Completion date must be on or after the start date",
      },
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Display order must be a non-negative number"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Project = model("Project", projectSchema);

module.exports = { Project };
