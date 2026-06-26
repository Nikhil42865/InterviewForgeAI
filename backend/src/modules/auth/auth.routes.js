const express = require('express');
const { signup, login, getProfile, updateProfile, changePassword, refreshTokenController, logout } = require('./auth.controller');
const { validateSignup, updateProfileValidation, changePasswordValidation} = require('./auth.validation');
const { protect } = require('./auth.middleware');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);
router.get(
    "/profile",
    protect,
    getProfile
);
router.put(
    "/profile",
    protect,
    updateProfileValidation,
    updateProfile
);
router.put(
    "/change-password",
    protect,
    changePasswordValidation,
    changePassword
);

router.post(
    "/refresh-token",
    refreshTokenController
);

router.post(
    "/logout",
    protect,
    logout
);
module.exports = router;