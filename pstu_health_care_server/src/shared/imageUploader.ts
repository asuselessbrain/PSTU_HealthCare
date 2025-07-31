import { Request } from "express"
import multer from "multer"
import path from "path"
import { v2 as cloudinary } from 'cloudinary';
import { IFile } from "../interfaces/file";
import fs from 'fs';
import { config } from "../config";

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloud_api_key,
    api_secret: config.cloudinary.cloud_api_secret
});


export const uploadToCloudinary = async (file: IFile) => {
    try {
        const uploadResult = await cloudinary.uploader
            .upload(
                file.path, {
                public_id: file.filename,
            }
            )
        fs.unlink(file.path, (error) => {
            if (error) console.error('Failed to delete local file:', error);
        });
        return uploadResult;
    }
    catch (error) {
        console.log(error)
    }
}


const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req: Request, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})



export const upload = multer({ storage: storage })



