import { Schema, model } from 'mongoose';

// Interface representing document
interface User {
  id: string;
  name: string;
  mail: string;
  password: string;
}

// Schema corresponding to document interface
const userSchema = new Schema<User>({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Create model
const userModel = model<User>('userModel', userSchema);

export { userModel };
