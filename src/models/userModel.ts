import mongoose, { ObjectId, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../types/userTypes";

// interface userTypes {
//   name: string;
//   email: string;
//   password: string | undefined;
//   photo?: string;
//   address?: string;
// }

// interface userMethods extends userTypes {
//   correctPassword: (candidatePassword, userPassword) => void;
// }

const userSchema: Schema<IUserDocument> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true, // exclude the white spaces
  },
  email: {
    type: String,
    required: [true, "Please add a email address"],
    lowercase: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  photo: String,
  address: String,
  password: {
    type: String || undefined,
    required: [true, "Please provide a password"],
    minLength: [8, "password must be atleast 8 characters"],
    select: false,
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    //? if password is modified only we need to hash
    this.password! = await bcrypt.hash(this.password!, 12);
  }
});

userSchema.methods.correctPassword = async function (
  canditatePassword,
  userPassword
) {
  return bcrypt.compare(canditatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  console.log(JWTTimestamp, "JWT");

  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      String(this.passwordChangedAt.getTime() / 1000),
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

export const User = mongoose.model<IUserDocument>("User", userSchema);
