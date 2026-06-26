const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./auth.model");

const generateAccessToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );
};

const generateRefreshToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

const registerUser = async (name, email, password) =>{
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error("User already exists with this email");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
        password,
        salt
    );
    const user = await User.create({
        name,
        email,
        password : hashedPassword,
    });
    
    const accessToken = generateAccessToken(user.id);

    const refreshToken = generateRefreshToken(user.id);

    user.refreshToken = refreshToken;

    await user.save();

    return {
        _id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
    };
    
};

const loginUser = async (email, password) =>{
    const user = await User.findOne({email});
    if(!user){
        const error = new Error("Invalid Credentials");
        error.statusCode = 401;
        throw error;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        const error = new Error("Invalid Credentials");
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAccessToken(user.id);

    const refreshToken = generateRefreshToken(user.id);

    user.refreshToken = refreshToken;

    await user.save();

    return {
        _id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
    };
};

const updateUserProfile = async (
    userId,
    updateData
) =>{
    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new : true,
        }
    ).select("-password");

    return user;
};

const changeUserPassword = async (
    userId,
    oldPassword,
    newPassword
) => {
    const user = await User.findById(userId);
    if(!user){
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(
        oldPassword,
        user.password
    );
    if(!isMatch){
        throw new Error("Old password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return true;
};

const refreshAccessToken = async (refreshToken) =>{
    if(!refreshToken){
        throw new Error("Refresh token is required");
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);

    if(!user){
        throw new Error("User not found");
    }

    if(user.refreshToken !== refreshToken){
        throw new Error("Invalid refresh token");
    }
    const accessToken = generateAccessToken(user.id);

    return {
        accessToken
    };
};

const logoutUser = async (userId) =>{
    const user = await User.findById(userId);
    if(!user){
        throw new Error("User not found");
    }

    user.refreshToken = "";

    await user.save();

    return true;
};

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    changeUserPassword,
    generateAccessToken,
    generateRefreshToken,
    refreshAccessToken,
    logoutUser,
};
