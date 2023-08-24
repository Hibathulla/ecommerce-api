import mongoose from "mongoose";
import { productType } from "../types/product";
import slugify from "slugify";

const productSchema = new mongoose.Schema<productType>(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true, // exclude the white spaces
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    discountPrice: {
      type: Number,
      required: [true, "A product must have a price"],
      validate: {
        message: "Discount price {VALUE} should be less than actual price",
        validator: function (val) {
          return val < (this as any).price;
        },
      },
    },
    description: {
      type: String,
    },
    slug: String,
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    size: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
      },
    ],
    isFeatured: Boolean,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema?.pre("save", function (next) {
  this.slug = slugify(this?.name, { lower: true, trim: true });

  next();
});

export const Product = mongoose.model("Product", productSchema);
