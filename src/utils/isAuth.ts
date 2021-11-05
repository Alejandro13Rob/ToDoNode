import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const jwtSECRET: string = process.env.JWT_SECRET!;

const isAuth = token => {
  try {
    if (token) {
      const decoded = jwt.verify(token, jwtSECRET);
      return decoded;
    }
  } catch (error: any) {
      throw new Error(error);
    }
}

export { isAuth };