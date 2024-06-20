import asyncHandler from "express-async-handler"
import User from "../Models/userModal.js"
import generateToken from "../utils/generateToken.js"
import cloudinary from "../utils/cloudinary.js"

//public
const authUser = asyncHandler(async(req,res)=>{
  const {email,password} = req.body

  const user = await User.findOne({email})

  if(user && (await user.matchPasswords(password))){
    generateToken(res,user._id,'userJwt')
    res.status(201).json({
      id:user.id,
      name:user.name,
      email:user.email,
      profileImage:user.profileImage
    })
  }else{
    res.status(401)
    throw new Error('Invalid email or password ')
  }
})

//public
const registerUser = asyncHandler(async(req,res)=>{
  
  const {name,email,password} = req.body
  const alreadyExists = await User.findOne({email})
  
  if(alreadyExists){
    res.status(400)
    throw new Error('user Already exists')
  }
  
  const user = await User.create({
    name,
    email,
    password
})

  if(user){
    generateToken(res,user._id,'userJwt')
    res.status(201).json({
      id:user.id,
      name:user.name,
      email:user.email,
      profileImage:user.profileImage
    })
  }else{
      res.status(400)
      throw new Error("Invalid user data")
  }
})

//public
const logoutUser = asyncHandler(async(req,res)=>{
  res.cookie('userJwt','',{
    httpOnly:true,
    expires:new Date(0)
  })
  res.status(200).json({message:'Logout user'})
})

//private
const getUserProfle = asyncHandler(async(req,res)=>{

  const user = {
    _id:req.user._id,
    name:req.user.name,
    email:req.user.email,
    profileImage:req.user.profileImage

  }

  res.status(200).json(user)
})

//private
const updateUserProfile = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.user._id)
  if(user){

    if(user.profileImage){
      const publicIdMatch = user.profileImage.match(/\/([^/]+)$/);
      if(publicIdMatch&&publicIdMatch[1]){
        const publicId = publicIdMatch[1]
        await cloudinary.uploader.destroy(publicId)
      }
    }

    if(req.file){
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        user.profileImage = result.secure_url
      } catch (error) {
        return res.status(400).json({ error: 'Failed to upload image to Cloudinary' });
      }
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if(req.body.password){
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.status(200).json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      profileImage:updatedUser.profileImage
    })
  }else{
    res.status(404)
    throw new Error('User not found')
  }

  res.status(200).json({message:'user profile updated'})
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfle,
  updateUserProfile
}