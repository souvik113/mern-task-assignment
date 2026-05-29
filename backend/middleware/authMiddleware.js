const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization

        if(!token){
            return res.status(401).json({"message":"No Token available"})
        }

        const verify_code = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verify_code
        next()
    } catch (error) {
        return res.status(401).json({"message":"Invalid Token"})
    }
}