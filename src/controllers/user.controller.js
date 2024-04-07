import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadCloudinary from "../utils/fileupload.js";

const register = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { username, email, password, fullname } = req.body;
  console.log("Username = ", username);
  console.log(req.files);

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

  const avatarRes = await uploadCloudinary(req.files.avatar[0]);
  const coverPicRes = await uploadCloudinary(req.files.coverImage[0]);
  // storing the object in Db
  console.log("avatar",avatarRes);
  console.log("cover",coverPicRes);

  const userData = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullname,
    avatar: avatarRes.url,
    coverImage: coverPicRes?.url || "",
  });
  console.log("USERDATA=>",userData);
  // check if user is created properly
  const userCreated = await User
    .findById(userData._id);

  if (!userCreated) throw new ApiError(500, "something went wrong");

  // returning the final response
  return res
    .status(201)
    .json(new ApiResponse(200, userCreated, "Registered successfully"));
});

export { register };
