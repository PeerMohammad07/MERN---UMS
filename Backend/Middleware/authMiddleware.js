import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../Models/userModal.js';

const protect = asyncHandler(async (req,res,next)=>{
  let token ;
  token = req.cookies.userJwt
  if(token){
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password');
      next()
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized user, Invalid token')
    }
  }else{
    res.status(401)
    throw new Error('Not authorized user, no token')
  }
})

export { protect }