const { registerUser} = require("./auth.service");
const { loginUser, updateUserProfile, changeUserPassword, refreshAccessToken, logoutUser } = require("./auth.service");
const asyncHandler =
    require("express-async-handler");

const signup = asyncHandler(async (req, res) =>{
    
        const {name, email, password} = req.body;

        const user = await registerUser(
            name,
            email,
            password
        )

        res.status(201).json({
            success : true,
            message : "User registered successfully",
            data : user,
        });
    
});

const login = asyncHandler(async (req, res) =>{
   const {email, password} = req.body;

   const user = await loginUser(email, password);

   res.status(200).json({
    success : true,
    message : "Login successful",
    data : user
   });
});

const getProfile = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

const updateProfile = asyncHandler(async (req, res) =>{
        const user = await updateUserProfile(
            req.user.id,
            req.body
        )
        res.status(200).json({
            success : true,
            message : "profile updated successfully",
            data : user,
        });
    
});

const changePassword = asyncHandler(async (req, res) =>{
        const {
            oldPassword,
            newPassword
        } = req.body;

        await changeUserPassword(
            req.user.id,
            oldPassword,
            newPassword
        )
        res.status(200).json({
            success : true,
            message : "Password changed successfully",
        });
});

const refreshTokenController = asyncHandler(async (req, res) =>{
        const {refreshToken} = req.body;
        
        const token = await refreshAccessToken(refreshToken);

        res.status(200).json({
            success : true,
            ...token
        });
    
});

const logout = asyncHandler(async (req, res) =>{
        await logoutUser(req.user.id);

        res.status(200).json({
            success : true,
            message : "Logged out successfully"
        });
});

module.exports = {
    signup,
    login,
    getProfile,
    refreshTokenController,
    updateProfile,
    changePassword,
    logout,
};
