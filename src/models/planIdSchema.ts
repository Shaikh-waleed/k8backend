import mongoose from "mongoose";
const { Schema } = mongoose;

const planIdSchema = new Schema({
    _id: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    countryID:{ type: String, required: true },
    months:{ type: Number, required: true },
});

const PlanId = mongoose.model('paymentplan', planIdSchema);

export default PlanId