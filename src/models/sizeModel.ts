import mongoose from "mongoose";
import { sizeType } from "../types/size";

const sizeSchema = new mongoose.Schema<sizeType>(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    name: {
      type: String,
      required: [true, "A size must have a name"],
      trim: true, // exclude the white spaces
      unique: true,
    },
    value: {
      type: String,
      required: [true, "A size must have a value"],
      trim: true, // exclude the white spaces
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Size = mongoose.model("Size", sizeSchema);
