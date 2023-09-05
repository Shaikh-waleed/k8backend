import mongoose from "mongoose";
const { Schema } = mongoose;

const SubEventSchema = new Schema({
    id: { type: String },
    event_version: { type: String },
    create_time: { type: String },
    resource_type: { type: String },
    resource_version: { type: String },
    event_type: { type: String },
    summary: { type: String },
    resource: {
        quantity: { type: String },
        subscriber: {
            email_address: { type: String },
            payer_id: { type: String },
            name: {
                given_name: { type: String },
                surname: { type: String },
            },
            shipping_address: {
                name: {
                    full_name: { type: String },
                },
                address: {
                    address_line_1: { type: String },
                    admin_area_2: { type: String },
                    postal_code: { type: String },
                    country_code: { type: String },
                }
            }
        },
        create_time: { type: String },
        plan_overridden: { type: Boolean },
        shipping_amount: {
            currency_code: { type: String },
            value: { type: String },
        },
        start_time: { type: String },
        update_time: { type: String },
        billing_info: {
            outstanding_balance: {
                currency_code: { type: String },
                value: { type: String },
            },
            cycle_executions: [
                {
                    tenure_type: { type: String },
                    sequence: { type: Number },
                    cycles_completed: { type: Number },
                    cycles_remaining: { type: Number },
                    current_pricing_scheme_version: { type: Number },
                    total_cycles: { type: Number },
                }
            ],
            last_payment: {
                amount: {
                    currency_code: { type: String },
                    value: { type: String },
                },
                time: { type: String },
            },
            next_billing_time: { type: String },
            failed_payments_count: { type: Number },
        },
        links: { type: Array },
        id: { type: String },
        plan_id: { type: String },
        status: { type: String },
        status_update_time: { type: String },
    },
    links: { type: Array },
});


const SubEvent = mongoose.model('SubscriptionEvent', SubEventSchema);

export default SubEvent