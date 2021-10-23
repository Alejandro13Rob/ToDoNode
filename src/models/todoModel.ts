import { Schema, model } from 'mongoose';

// Interface representing document
interface ToDo {
  id: string;
  title: string;
  description: string;
  date?: Date;
}

// Schema corresponding to document interface
const todoSchema = new Schema<ToDo>({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

// Create model
const todoModel = model<ToDo>('todoModel', todoSchema);

export { todoModel };
