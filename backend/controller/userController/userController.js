import UserModel from "../../model/userSchema/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const hashPassword = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

const CheckPassword = (pass, userhashpass) => {
  const check = bcrypt.compare(pass, userhashpass);
  return check;
};

const CreateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "7 days",
  });
};

const CsrfToken = () => {
  return crypto.randomBytes(22).toString("hex");
};

export const UserRegister = async (resq, resp) => {
  const { username, email, password, cpassword } = resq.body;
  if (!username || !email || !password || !cpassword) {
    // console.log("hi");
    return resp.status(400).json({
      sucess: false,
      message: "Please provide full information",
    });
  }
  if (password !== cpassword) {
    return resp.status(400).json({
      sucess: false,
      message: "Password and confirm password must be same",
    });
  }
  if (password.length < 6) {
    return resp.status(400).json({
      sucess: false,
      message: "Password must upto 6 length",
    });
  }
  try {
    const checkemail = await UserModel.findOne({ email });
    if (checkemail) {
      return resp.status(400).json({
        sucess: false,
        message: "Email already exists!!",
      });
    }
    const newpass = await hashPassword(password);
    const res = await UserModel.create({
      username,
      email,
      password: newpass,
    });
    if (res) {
      return resp.status(201).json({
        sucess: true,
        message: "Account created sucessfully",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return resp.status(400).json({
        sucess: false,
        message: "Username already exist",
      });
    }
    if (error.message.includes("email")) {
      return resp.status(400).json({
        sucess: false,
        message: "Invalid email",
      });
    } else {
      console.log(error);
      return resp.status(500).json({
        sucess: false,
        message: "Server error",
      });
    }
  }
};

export const UserLogin = async (resq, resp) => {
  const { email, password } = resq.body;
  if (!email || !password) {
    return resp.status(400).json({
      sucess: false,
      message: "Please provide full information",
    });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return resp.status(400).json({
        sucess: false,
        message: "Email not found!!",
      });
    }
    const checkpass = await CheckPassword(password, user.password);
    if (!checkpass) {
      return resp.status(400).json({
        sucess: false,
        message: "Wrong password!!",
      });
    }
    const token = CreateToken(user._id);
    const csrf = CsrfToken();
    resp.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7000 * 86400),
      sameSite: "none",
      secure: true,
    });
    const update = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      { csrf: csrf }
    );
    return resp.status(200).json({
      sucess: true,
      message: "Login sucessfully!!",
      csrf: csrf,
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    return resp.status(500).json({
      sucess: false,
      message: "Server error",
    });
  }
};

export const UserProfile = async (resq, resp) => {
  const { id } = resq;
  // console.log(id)
  try {
    const user = await UserModel.findOne({ _id: id });
    if (user) {
      return resp.status(200).json({
        sucess: true,
        user,
      });
    }
  } catch (error) {
    console.log(error.message);
    return resp.status(200).json({
      sucess: false,
      error: error.message,
    });
  }
};

export const UserLogout = async (resq, resp) => {
  resp.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return resp.status(200).json({
    sucess: true,
    message: "Logout sucessfully",
  });
};
