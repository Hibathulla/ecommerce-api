import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true, // exclude the white spaces
  },
  slug: String,
  category: {
    type: String,
    required: [true, "A product must have a category"],
  },
  size: {
    type: String,
    required: [true, "A product must have a size"],
  },
  isFeatured: Boolean,
});

export const Product = mongoose.model("Product", productSchema);
