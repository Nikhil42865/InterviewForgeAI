const validateSignup = (req, res, next) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message : "All fields are required"
        });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if(!emailRegex.test(email)){
        return res.status(400).json({
            message : "Invalid email format"
        });
    }

    if(password.length < 6){
        return res.status(400).json({
            message : "Password must be at least 6 characters long."
        });
    }

    next();
};

const updateProfileValidation = (req, res, next) =>{
    const {name, bio, avatar} = req.body;
    if(!name){
        return res.status(401).json({
            success : false,
            message : "Name is required"
        });
    }

    next();
};

const changePasswordValidation = (req, res, next) =>{
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword || !newPassword){
        return res.status(400).json({
            success : false,
            message : "Both old and new passwords are required"
        });
    }
    
    next();
};

module.exports = {
    validateSignup,
    updateProfileValidation,
    changePasswordValidation
};