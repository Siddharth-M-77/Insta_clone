import jwt from 'jsonwebtoken'

const isAuthenticated = async(req,res,next)=>{

    try {
        const token = req.cookies.toen;
        if(!token){
            return res.status(401).json({
                message:"User not Authenticated",
                success:false
            });
        }

        //for verify token using jwt.verify
        const decode = jwt.verify(token,process.env.SECERET_KEY);

        if(!decode){
            return res.status(401).json({
                message:"Invalid Token",
                success:false
            });
        }
        req.id = decode.userId;

        next(); 

    } catch (error) {
        console.log(error);
        
    }
}