import mongoose from "mongoose";

interface IPost {
  content: string;
  images: [String];
  user: mongoose.Types.ObjectId;
  likesCount?: Number;
  commentsCount?: Number;
  createdAt?: Date;
}

const schema = new mongoose.Schema({
  content: String,
  images: [String],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: [true, "A post  must have a creator user"],
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<IPost>("Post", schema);
