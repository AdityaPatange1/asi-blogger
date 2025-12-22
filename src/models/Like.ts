import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILike extends Document {
  _id: mongoose.Types.ObjectId;
  blogId: mongoose.Types.ObjectId;
  visitorId: string; // Browser fingerprint or session ID
  createdAt: Date;
}

const LikeSchema = new Schema<ILike>(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'Blog ID is required'],
    },
    visitorId: {
      type: String,
      required: [true, 'Visitor ID is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent duplicate likes
LikeSchema.index({ blogId: 1, visitorId: 1 }, { unique: true });

const Like: Model<ILike> = mongoose.models.Like || mongoose.model<ILike>('Like', LikeSchema);

export default Like;
