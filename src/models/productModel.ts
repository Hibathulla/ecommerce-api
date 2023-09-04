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
      // validate: {
      //   validator: function (val) {
      //     // console.log(val, pr, "val");

      //     return val < (this as any).price;
      //   },
      //   message: "Discount price {VALUE} should be less than actual price",
      // },
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
    outOfStock: Boolean,
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

// productSchema.pre("validate", function (next) {
//   if (this.discountPrice! > this.price) {
//     this.invalidate(
//       "discountPrice",
//       `Discount price ${this.discountPrice!} should be less than actual price ${
//         this.price
//       }`,
//       this.price
//     );
//   }

//   next();
// });

productSchema?.pre("save", function (next) {
  this.slug = slugify(this?.name, { lower: true, trim: true });

  next();
});

productSchema?.pre(/^find/, function (next) {
  (this as any).populate({
    path: "size category",
    select: "category billboard billboardLabel name value",
  });
  next();
});

export const Product = mongoose.model("Product", productSchema);
