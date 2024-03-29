 import { StatusCodes } from 'http-status-codes';
 import User from '../models/UserModel.js';
 import Job from '../models/JobModel.js';
 import cloudinary from 'cloudinary';
 import { formatImage } from '../middleware/multerMiddleware.js';

 export const getCurrentUser = async (req, res) => {
 const user = await User.findOne({_id: req.user.userId});
 const userWithoutPswd = user.toJSON();

  res.status(StatusCodes.OK).json({ user : userWithoutPswd });
 };
export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({users,jobs });
  };
  
  export const updateUser = async (req, res) => {
    
    const newUser = {...req.body}
    delete newUser.password;
    if(req.file){
      return file = formatImage(req.file);
      //uploading the file to cloudinary path and removing the local link
      const response = await cloudinary.v2.uploader.upload(file);
  
      newUser.avatar = response.secure_url
      newUser.avatarPublicId = response.public_id;
    }
    const updatedUser = await User.findByIdAndUpdate( req.user.userId, newUser);
    //if user is updating the image we remove the old image in cloudinary because of cost
    //checking if old user adn image already there with publicID ,if old user new image then no publicID
    if(req.file && updatedUser.avatarPublicId){
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
    res.status(StatusCodes.OK).json({ msg: 'update user' });
  };