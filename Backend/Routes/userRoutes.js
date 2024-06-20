import express from 'express'
import { authUser,
  registerUser,
  logoutUser,
  getUserProfle,
  updateUserProfile 
} from "../Controller/userController.js"
import { protect } from '../Middleware/authMiddleware.js'
import upload from '../Middleware/multer.js'

const router = express.Router()

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUserProfle).put(protect,upload.single('image'),updateUserProfile)

export default router