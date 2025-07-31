import { Request } from "express"
import multer from "multer"
import path from "path"
import { v2 as cloudinary } from 'cloudinary';
import { IFile } from "../interfaces/file";
import fs from 'fs';

cloudinary.config({
    cloud_name: 'dc4nilvpv',
    api_key: '682899442441513',
    api_secret: 'xXQ0zS8Hfpiks900tzQpMdgo4c8' // Click 'View API Keys' above to copy your API secret
});


export const uploadToCloudinary = async (file: IFile) => {
    fs.unlink(file.path,(error)=>console.log(error))
    try {
        const uploadResult = await cloudinary.uploader
            .upload(
                file.path, {
                public_id: file.filename,
            }
            )
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



