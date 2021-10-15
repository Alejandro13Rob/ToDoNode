import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const mongoUrl: string = process.env.DATABASE_URL!;

const mongoConnect = async () => {
  mongoose
    .connect(mongoUrl, {
      w: 'majority'
    })
    .then(() => {
      console.info(`Connected to mongo!`);
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export { mongoConnect };
