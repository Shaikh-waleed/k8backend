import mongoose from "mongoose";

const { Schema } = mongoose;

const clusterSchema = new Schema({
  clusterType: { type: Number, required: true },
  cloudId: { type: Schema.Types.ObjectId },
  userId: { type: Schema.Types.ObjectId, required: true },
  cloudType: { type: Number, required: true },
  name: { type: String, required: true },
  version: { type: String, required: true },
  region: { type: String, required: true },
  nodeSize: { type: String },
  resourceGroupName: { type: String },
  workerNodes: { type: Number },
});

const Cluster = mongoose.model("Cluster", clusterSchema);

export default Cluster;
