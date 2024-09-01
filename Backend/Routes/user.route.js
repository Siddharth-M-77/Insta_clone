import express from "express"
import {register,login ,logout,getProfile,getSuggestedUsers,editProfile, followOrUnfollow} from "../controllers/user.controllers.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
const router = express.Router();
import upload from "../middlewares/multer.js"



router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated,getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePicture'), editProfile);

router.route('/suggested').get(isAuthenticated,getSuggestedUsers);
router.route('/followOrunfollow/:id').post(isAuthenticated,followOrUnfollow);

export default router;