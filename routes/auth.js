const express = require("express");
const userController=require("../controllers/users");
const router = express.Router();



router.post('/register',userController.register);
// router.post('/home',userController.home);
router.post('/login',userController.login);
module.exports = router;