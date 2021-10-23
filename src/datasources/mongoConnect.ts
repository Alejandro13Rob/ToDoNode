import * as dotenv from 'dotenv';
import { connect } from 'mongoose';
import { todoModel } from '../models/todoModel';

dotenv.config();
const mongoUrl: string = process.env.DATABASE_URL!;

async function mongoConnect(): Promise<void> {
    await connect(mongoUrl);
    console.info(`Connected to mongo!`);
}

export { mongoConnect };
