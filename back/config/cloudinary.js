import CloudinaryStorage from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'blog',
        allowedFormats: ['png', 'jpeg', 'jpg']
    }
});

export { storage, cloudinary}