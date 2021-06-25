import mongoose, { Document, Model } from 'mongoose';
import AuthService from '@src/services/auth';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

export interface UserModel extends Omit<User, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email must be unique'],
    },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

/**
 * Validates the email and throws a validation error, otherwise it will throw a 500
 */
// buscando no banco se ha outra informação igual (email) antes de salvar um novo usuário e retornando um erro personalizado, ao invés de deixar o mongoose gerar um erro próprio
schema.path('email').validate(
  async (email: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
  },
  'already exists in the database.',
  CUSTOM_VALIDATION.DUPLICATED
);

// usando function() ao invés de arrow function, pois a arrow function iria pegar o this do modulo todo, do escopo global do arquivo e não de dentro da função
schema.pre<UserModel>('save', async function (): Promise<void> {
  if (!this.password || !this.isModified('password')) {
    return;
  }

  try {
    const hashedPassword = await AuthService.hashPassword(this.password);
    this.password = hashedPassword;
  } catch (err) {
    console.error(`Error hashing the password for the user ${this.name}`);
  }
});

export const User: Model<UserModel> = mongoose.model('User', schema);
