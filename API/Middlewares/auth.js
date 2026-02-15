import jwt from 'jsonwebtoken'
export const Authenticated=async(req,res,next)=>{
    const token=req.header("Auth")

    if(!token) return res.json({message:"Login First"})

        const decoded=jwt.verify(token,"!@#$^&()");
        console.log(decoded);
        

}