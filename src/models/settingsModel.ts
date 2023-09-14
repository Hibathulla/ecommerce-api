import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    storeName: {
      type: String,
      required: [true, "Please enter a store name"],
    },
    billboard: {
      type: String,
    },
    billboardLabel: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Settings = mongoose.model("Settings", settingsSchema);
