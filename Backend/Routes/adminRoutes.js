import express from 'express'
import { addNewUser, adminAuth, adminLogout, deleteUser, getUsers, updateUser } from '../Controller/adminController.js'
import { adminProtect } from '../Middleware/adminAuthMiddleware.js'
import upload from '../Middleware/multer.js'

const adminRouter = express.Router()

adminRouter.post('/',adminAuth)
adminRouter.post('/logout',adminLogout)
adminRouter.put('/profile',adminProtect,upload.single('image'),updateUser)
adminRouter
  .route('/users')
  .get(adminProtect,getUsers)
  .delete(adminProtect,deleteUser)
  .post(adminProtect,upload.single('image'),addNewUser)
export default adminRouter