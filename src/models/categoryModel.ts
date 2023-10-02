import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: String,
      required: [true, "A category must have a name"],
      trim: true, // exclude the white spaces
      unique: true,
    },
    billboard: String,
    billboardLabel: String,
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema?.pre("save", function (next) {
  this.slug = slugify(this?.category as string, { lower: true, trim: true });
  next();
});

export const Category = mongoose.model("Category", categorySchema);
