import mongoose, { Model } from 'mongoose';

import env from '../env';
import entityMapper from './entityMapper';
import { categoryData, articleData, roleData } from './data';
import { Category, Article, Role, User } from '../models';

async function seed(): Promise<never> {
  try {
    console.log('Migration has started...');

    mongoose.set('strictQuery', true);
    await mongoose.connect(env.connectionString);

    await entityMapper(categoryData, Category);
    await entityMapper(articleData, Article);
    await entityMapper(roleData, Role);
    await entityMapper(userData, User);

    await mongoose.disconnect();
    console.log('Initial migration has completed');
    return process.exit(0);
  } catch (err: any) {
    console.log(err.message);
    return process.exit(1);
  }
}

const userData = [
  {
    _id: 'b1ab34db64cee52c66f99510',
    username: 'admin',
    firstName: 'Alex',
    lastName: 'Peev',
    role: 'a1cb37db64cee52c66f99510',
    email: env.adminEmail,
    password: env.adminPwd,
    articles: ['a1cb371b64ce152c66f99510', 'a1cb371b64ce252c66f99510']
  }
];

seed();
