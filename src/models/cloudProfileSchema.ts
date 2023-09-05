import mongoose from "mongoose";

const { Schema } = mongoose;

const cloudProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  cloudType: { type: Number, required: true },
  name: { type: String, required: true },
  accessKeyId: { type: String },
  secretAccessKey: { type: String },
  region: { type: String, required: true },
  databaseType: { type: String },
  resourceGroupName: { type: String },
});

const CloudProfile = mongoose.model("CloudProfile", cloudProfileSchema);

export default CloudProfile;
