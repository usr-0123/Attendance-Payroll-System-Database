import jwt from "jsonwebtoken";
import {notAuthorized} from '../helpers/helperFunctions.js'

export const VerifyTokenMiddleware = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, (err, decode) =>  {
            if (err) {
                return notAuthorized(res, 'You do not have Access');
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        return notAuthorized(res, 'You do not have Access');
    }

} 