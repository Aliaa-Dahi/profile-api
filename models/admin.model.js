const { model, Schema } = require("mongoose");

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Minlenth is 6"],
      maxlength: [50, "Maxlength is 20"],
    },
  },
  { versionKey: false }
);

const Admin = model("Admin", AdminSchema);
module.exports = { Admin };
