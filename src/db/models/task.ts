import mongoose from '../../plugins/mongoose';

const { Schema } = mongoose;

export interface TaskDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  creationDate: Date;
  description: string;
  dueDate: Date;
  status: string;
  title: string;
  user: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  description: String,
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    default: 'Todo',
    enum: ['In Progress', 'Completed', 'Todo'],
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
});

export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);