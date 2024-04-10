
import {SignJWT,jwtVerify} from "jose";

export async function CreateToken(email,id){
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = {email ,id}
    const token = await  new SignJWT(payload)
        .setProtectedHeader({alg:"HS256"})
        .setIssuedAt()
        .setIssuer(process.env.JWT_ISSUER)
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
        .sign(secret)
    return token
}

export async function VerifyToken(token){
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decode = await jwtVerify(token,secret)
    return decode['payload']
}
