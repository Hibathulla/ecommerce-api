import mongoose from "mongoose";

const Locationschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  loc: {
    type: {
      type: String,
    },
    coordinates: [],
  },
  radius: {
    type: "Number",
  },
});

Locationschema.index({
  loc: "2dsphere",
});

export const Location = mongoose.model("Location", Locationschema);
