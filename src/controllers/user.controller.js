import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

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
  const loggedinUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if(loggedinUser) {
    throw new ApiError("user with email or username already exists");
  }
});

export { register };
