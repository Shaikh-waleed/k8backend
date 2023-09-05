import mongoose from "mongoose";
const { Schema } = mongoose;

const productPlanSchema = new Schema({
    _id: { type: String },
    product_id: { type: String },
    name: { type: String },
    status: { type: String },
    description: { type: String },
    usage_type: { type: String },
    billing_cycles: [
        {
            pricing_scheme: {
                version: { type: Number },
                fixed_price: {
                    currency_code: { type: String },
                    value: { type: String },
                },
                create_time: { type: String },
                update_time: { type: String },
            },
            frequency: {
                interval_unit: { type: String },
                interval_count: { type: Number },
            },
            tenure_type: { type: String },
            sequence: { type: String },
            total_cycles: { type: String },
        }
    ],
    payment_preferences: {
        service_type: { type: String },
        auto_bill_outstanding: { type: Boolean },
        setup_fee: {
            currency_code: { type: String },
            value: { type: String },
        },
        setup_fee_failure_action: { type: String },
        payment_failure_threshold: { type: Number },
    },
    taxes: {
        percentage: { type: Number },
        inclusive: { type: Number },
    },
    quantity_supported: { type: Boolean },
    create_time: { type: String },
    update_time: { type: String },
    links: { type: Array }
});

const ProductPlan = mongoose.model('productplan', productPlanSchema);

export default ProductPlan