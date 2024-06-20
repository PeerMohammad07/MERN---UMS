import jwt from 'jsonwebtoken';

const generateToken = (res,userId,tokenName) =>{
  const Token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:'30d'
  })

  res.cookie(tokenName,Token,{
    httpOnly:true,
    secure:process.env.NODE_ENV  !== 'development',
    sameSite:'strict',
    maxAge:30*24*60*60*1000
  })
}

export default generateToken