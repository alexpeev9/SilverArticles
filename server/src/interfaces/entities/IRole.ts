import { Document, Schema } from 'mongoose';

interface IRole extends Document {
  title: string;
  description: string;
  users: Schema.Types.ObjectId[];
}

export default IRole;
