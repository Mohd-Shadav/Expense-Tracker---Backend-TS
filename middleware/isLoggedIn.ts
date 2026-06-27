import jwt from "jsonwebtoken"

const isLoggedIn = (req:any,res:any,next:any)=>{
    try{
      
        let token = req.cookies.token;
        
        if(!token){ 
            return res.status(404).json({
                message:"UnAuthenticated User" 
            })
        }

    let decode = jwt.verify(token,process.env.SECRETKEY as string)

    

    req.user = decode;

    next();


    }catch(err){
        return res.status(500).json({
            message: err
        })
    }





}

export default isLoggedIn;