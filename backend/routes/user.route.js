const express = require('express');
const router = express.Router();

const {body} = require('express-validator')
const userController = require('../controllers');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstName').isLength({min:3}).withMessage("First name should be atleast 3 character"),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 character long')

],userController.registerUser
)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('passpword').isLength({min:6}).withMessage('Passoword Is Incorrect')
],
userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);

module.export.router;