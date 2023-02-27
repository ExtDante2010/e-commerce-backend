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
      type: Nuember,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Xiaomi", "Lenovo", "Nokia", "Oppo"],
    },
    quantity: Number,
    sold: {
      type: Nuember,
      default: 0,
    },
    image: {
      type: Array,
    },
    color: {
      type: String,
      enum: ["black", "white", "Brown", "Red", "Green", "Yellow"],
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
