import { UnauthenticatedError, UnauthorizedError, BadRequestError } from '../errors/customError.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser =  (req, res, next) => {
  const{token} = req.cookies;
  if(!token) throw new UnauthenticatedError('authentication Invalid');
  try{
    const {userId, role} = verifyJWT(token);
    const testUser = userId === '65d20652ae436330469d84bb';
    req.user = {userId, role, testUser}
    next();
  }catch(error){
    throw new UnauthenticatedError('authentication Invalid');
  }
  

  };

  export const authorizeUser = (...roles) =>{
    return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
      throw new UnauthorizedError('unauthorised access')
    }
      next();
    }

  };

  export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
      throw new BadRequestError('Demo User. Read Only!');
    }
    next();
  };