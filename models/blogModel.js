import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLike: {
      type: Boolean,
      default: false,
    },
    isDislike: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://media.vandalsports.com/i/1706x960/5-2022/202251816546_1.jpg.webp",
    },
    author: {
      type: "string",
      default: "admin",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
//
