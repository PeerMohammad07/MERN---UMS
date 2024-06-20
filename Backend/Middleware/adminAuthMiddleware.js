import asyncHandler from 'express-async-handler'
import User from '../Models/userModal.js';
import jwt from 'jsonwebtoken'

const adminProtect = asyncHandler(async (req,res,next)=>{
  let token ;
  token = req.cookies.adminJwt
  
  if(token){
    try {
      let decoded = jwt.verify(token,process.env.JWT_SECRET)

      req.admin = await User.findById(decoded.userId).select('-password')

      next()
    } catch (error) {
        res.status(401)
        throw new Error("Not Authorized Invalid token")
    }
  }else{
    res.status(401)
    throw new Error('Not Authorized no token')
  }
})

export {adminProtect}