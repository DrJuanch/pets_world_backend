const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function uploadImage(filePath){
  return await cloudinary.uploader.upload(filePath,{
    folder: 'dogWalkerImages'
  });
};

async function deleteImage(publiCId){
  await cloudinary.uploader.destroy(publicId);
}

module.exports = {
  uploadImage,
  deleteImage
};
