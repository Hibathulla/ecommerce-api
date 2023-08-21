import { ObjectId, Model, Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string | undefined;
  role: string;
  photo?: string;
  address?: string;
  passwordChangedAt: Date;
}

export interface UserDocumentWithId extends IUser, Document {
  _id: string;
}

export interface IUserDocument extends IUser, Document {
  correctPassword: (candidatePassword, userPassword) => Promise<boolean>;
  changedPasswordAfter: (JWTTimestamp) => Promise<boolean>;
}
