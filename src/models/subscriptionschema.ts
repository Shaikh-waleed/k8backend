import mongoose from "mongoose";
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    status: { type: String, required: true },
    id: { type: String, required: true },
    plan_id: { type: String, required: true },
    subscriber: {
        email_address: { type: String, required: true },
        payer_id: { type: String, required: true },
        name: {
            given_name: { type: String, required: true },
            surname: { type: String, required: true },
        }
    },
    billing_info: {
        cycle_executions: { type: Array, required: true },
        last_payment: {
            amount: {
                currency_code: { type: String, required: true },
                value: { type: String, required: true },
            },
            time: { type: String }
        },
        next_billing_time: { type: String },
        failed_payments_count: { type: Number, required: true },
    },
    create_time: { type: String, required: true },
});


const Subscription = mongoose.model('subscription', SubscriptionSchema);

export default Subscription