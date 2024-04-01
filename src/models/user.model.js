import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // index helps to search the data faster in the database
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    fullname: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
  },
  {
    // for createdAt and updatedAt fields
    timestamps: true,
  }
);

// hash the password before saving
// middleware
userSchema.pre("save", async function (next) {
  // arrow function is not used here because we need to access the user object
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    next();
  }
});

// compare the password
// This is our custom method to compare the password
userSchema.methods.isCorrectPassword = async function (password) {
  // we have to compare with the hashed password
  return await bcrypt.compare(password, this.password);
};

// generate token
userSchema.methods.generateAccessToken = function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    fullname: this.fullname,
    email: this.email
  }),
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
}

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    fullname: this.fullname,
    email: this.email
  }),
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
}

export const User = mongoose.model("User", userSchema);
