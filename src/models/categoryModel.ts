import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: String,
      required: [true, "A billboard must have a name"],
      trim: true, // exclude the white spaces
      unique: true,
    },
    billboard: String,
    billboardLabel: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Category = mongoose.model("Category", categorySchema);
