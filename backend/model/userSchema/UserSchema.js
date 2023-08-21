import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "please provide username"],
    },
    profile: {
      pic: {
        type: String,
        default:
          "https://res.cloudinary.com/ddcmktx4l/image/upload/v1686056994/pppp_adwaig.jpg",
      },
      public_id: {
        type: String,
        default: "abc",
      },
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    isAdmin: {
      type: Number,
      default: 0,
    },
    csrf: {
      type: String,
      default: "abc",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Userdata", userSchema);

export default UserModel;
