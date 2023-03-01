import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
      lowcase: true,
    },
    descirption: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      type: Array,
    },
    color: {
      type: String,
      require: true,
    },
    ratings: [
      {
        type: Number,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
//
