import mongoose from '../../plugins/mongoose';

const { Schema } = mongoose;

export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  tasks: Array<mongoose.Types.ObjectId>;
  username: string;
}

const UserSchema = new Schema({
  tasks: {
    ref: 'Task',
    of: Schema.Types.ObjectId,
    type: Array,
  },
  email: String,
  password: String,
  username: String,
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);