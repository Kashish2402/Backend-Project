import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnClodinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return new Error("Couldn't find file");
    }

    //   UPLOADING FILE ON CLOUDINARY

   const response= await cloudinary.uploader.upload(localFilePath, { resource_type: auto 
    });

    console.log('FILE SUCCESSFULLY UPLOADED ON CLOUDINARY')
    console.log(response.url)

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath)  //REMOVE LOCALLY SAVED TEMPORARILY FILE AS UPLOAD GOT FAILED
  }
};

export  {uploadOnClodinary}
