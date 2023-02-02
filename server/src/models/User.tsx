import { Schema, model } from 'mongoose';

const UserSchema = new Schema<any>(
  {
    username: {
      type: String,
      required: [true, 'Username is required!'],
      unique: true,
      validate: [
        /^[a-zA-Z0-9]+$/,
        'Username should consist of only english letters and digits'
      ],
      minLength: [4, 'Username cannot be less than 4 characters'],
      maxLength: [11, 'Username cannot be more than 11 characters']
    }
  },
  { timestamps: true }
);

const User = model<any>('User', UserSchema);

export default User;
