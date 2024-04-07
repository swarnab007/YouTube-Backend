import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadCloudinary from "../utils/fileupload.js";

const register = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { username, email, password, fullname } = req.body;
  console.log("Username = ", username);

  // validation - not empty
  if (
    [username, email, password, fullname].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(500, "All fields are required");
  }

  // check if user is logged in or not
  const loggedinUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (loggedinUser) {
    throw new ApiError(409, "user with email or username already exists");
  }

  // uploading files avatar image and cover image
  const avatarPath = req.files?.avatar[0]?.path;
  console.log(avatarPath);
  const coverPicPath = req.files?.avatar[0]?.path;

  if (!avatarPath) {
    throw new ApiError(400, "avatar field is required");
  }
  // upload on cloudinary
  const avatarRes = await uploadCloudinary(avatarPath);
  const coverPicRes = await uploadCloudinary(coverPicPath);

  // storing the object in Db
  const userData = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullname,
    avatar: avatarRes.url,
    coverImage: coverPicRes?.url || "",
  });
  // check if user is created properly
  const userCreated = await userData
    .findById(userData._id)
    .check("-password -refreshToken");

  if (!userCreated) throw new ApiError(500, "something went wrong");

  // returning the final response
  return res
    .status(201)
    .json(new ApiResponse(200, userCreated, "Registered successfully"));
});

export { register };
