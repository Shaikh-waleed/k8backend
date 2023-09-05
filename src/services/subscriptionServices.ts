import Subscription from "../models/subscriptionschema"


export default class SubcriptionServices {

    private getData = (data: any, userId: string) => {
        const { status, id, plan_id, subscriber, billing_info, create_time } = data
        const { email_address, payer_id, name } = subscriber
        const { given_name, surname } = name
        const { cycle_executions, next_billing_time, failed_payments_count, last_payment } = billing_info
        const { amount, time } = last_payment
        const { currency_code, value } = amount
        return {
            userId,
            status,
            id,
            plan_id,
            subscriber: {
                email_address,
                payer_id,
                name: {
                    given_name,
                    surname,
                }
            },
            billing_info: {
                cycle_executions,
                last_payment: {
                    amount: {
                        currency_code,
                        value,
                    },
                    time,

                },
                next_billing_time,
                failed_payments_count,
            },
            create_time,
        }
    }

    async update(data: any): Promise<any> {
        const oldSubscriptionObj = await Subscription.findOne({ id: data.id });
        if (!oldSubscriptionObj) {
            throw new Error("You can't update this subscription because it is not available")
        }
        const { status, id, plan_id, subscriber, billing_info, create_time } = data
        const { email_address, payer_id, name } = subscriber
        const { given_name, surname } = name
        const { cycle_executions, next_billing_time, failed_payments_count, last_payment } = billing_info
        const { amount, time } = last_payment
        const { currency_code, value } = amount
        const subscriptionObj = {
            userId: oldSubscriptionObj.userId,
            status,
            id,
            plan_id,
            subscriber: {
                email_address,
                payer_id,
                name: {
                    given_name,
                    surname,
                }
            },
            billing_info: {
                cycle_executions,
                last_payment: {
                    amount: {
                        currency_code,
                        value,
                    },
                    time,

                },
                next_billing_time: next_billing_time || oldSubscriptionObj.billing_info?.next_billing_time,
                failed_payments_count,
            },
            create_time,
        }
        // const subscriptionObj = this.getData(data)
        const subscription = await Subscription.findOneAndUpdate({ id: subscriptionObj.id }, { $set: subscriptionObj }, { new: true })
    }

    async create(data: any, userId: string): Promise<any> {
        const subscriptionObj = new Subscription(this.getData(data, userId))
        const subscription = await subscriptionObj.save()
        return subscription
    }
    async get(userId: string): Promise<any> {
        const subscriptions = await Subscription.find({ userId })
        return subscriptions
    }
}