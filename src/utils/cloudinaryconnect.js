import { v2 as cloudinary } from "cloudinary";


const cloudinaryconnect = async () => {
    // console.log(process.env.DB_URL);
    try {
        cloudinary.config({
            //!    ########   Configuring the Cloudinary to Upload MEDIA ########
            cloud_name: "dvbnkndyc",
            api_key: "667753236366743",
            api_secret: "O105zScLQvu8q24z8_M5bzziOMs",
        });
    } catch (error) {
        console.log(error);
    }
}


export  default  cloudinaryconnect;