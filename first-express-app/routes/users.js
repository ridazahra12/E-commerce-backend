// routers/userRouter.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/user/userController");
const authenticationController = require("../controller/common/authenticationController");

router.post("/auth/register", userController.registerUser);

// User login
router.post("/auth/login", authenticationController.loginUser);

module.exports = router;
