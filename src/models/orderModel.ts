import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    paymentId: String,
    orderId: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["success", "shipped", "delivered"],
      default: "success",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total: Number,
    discount: Number,
    products: [
      {
        category: String,
        size: String,
        id: mongoose.Schema?.Types?.ObjectId,
        images: [String],
        description: String,
        price: Number,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.pre(/^find/, function (next) {
  (this as any)
    .populate({
      path: "user",
      select: "name photo",
    })
    .populate({
      path: "products",
    });

  next();
});

export const Order = mongoose.model("Order", orderSchema);
