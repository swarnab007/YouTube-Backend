import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// uploading file on cloudinary
const uploadCloudinary = async (localFilePath) => {
  try {
    if (localFilePath) {
      let res = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      // remove the file if uploaded
      fs.unlinkSync(localFilePath);
      console.log("Flie uploaded successfully",res.url);
      return res;
    }
    else {
      return null;
    }
  } catch (error) {
    // remove the file from server
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadCloudinary;