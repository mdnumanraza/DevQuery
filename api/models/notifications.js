import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    user: { type: String, require: true },
    title: { type: String, require: true },
    text: { type: String, require: true },
  },
  {
    timestamps: true,
  }
)
export default mongoose.model("notification", notificationSchema);
