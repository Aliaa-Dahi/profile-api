const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Minlenth is 3"],
      maxlength: [100, "Maxlength is 100"],
      trim: true,
    },
    skills: {
      type: [
        {
          type: String,
          trim: true,
          minlength: [2, "Minlenth is 2"],
          maxlength: [50, "Maxlength is 50"],
        },
      ],
      required: [true, "skills are required"],
      validate: {
        validator: function (skills) {
          return skills.length >= 3;
        },
        message: "A project must have at least 3 skills",
      },
    },
  },
  { versionKey: false }
);

const Project = model("Project", projectSchema);

module.exports = { Project };
