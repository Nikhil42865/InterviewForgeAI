const jwt = require("jsonwebtoken");
const User = require("./auth.model");

const protect = async (req, res, next) =>{
    try{
        let token ;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
            if(!token){
                return res.status(401).json({
                    message : "Not authorized, no token"
                });
            }
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            )
            const user = await User.findById(
                decoded.id
            ).select("-password");
            req.user = user;
            next();
        }
        else{
            return res.status(401).json({
                message : "NOT authorized, no token"
            });
        }
    }
    catch(error){
        return res.status(401).json({
            message : "Token is not valid"
        });
    }
};

module.exports = {
    protect
}