import { Document, Schema } from 'mongoose';

interface IArticle extends Document {
  title: string;
  slug: string;
  image: string;
  description: string;
  isPublic: boolean;
  rating: number;
  category: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  votes: Schema.Types.ObjectId[];
}

export default IArticle;
