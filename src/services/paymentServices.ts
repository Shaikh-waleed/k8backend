import axios from "axios";
import PlanId from "../models/planIdSchema";
import ProductPlan from "../models/productPlan";
import PaypalToken from "../utils/paypalToken";
import SubcriptionServices from "./subscriptionServices";

export default class PaymentServices extends PaypalToken {
    subscription: SubcriptionServices

    constructor() {
        super()
        this.subscription = new SubcriptionServices()
    }

    async getPaymentDetails(countryID: {countryID:string}): Promise<any> {
        const plan = await PlanId.find(countryID).sort({ months: 1 })
        const plans = await ProductPlan.find({
            _id: { $in: [plan[0]._id, plan[1]._id, plan[2]._id] }
        })
        return plans
    }

    async setPaymentDetails(id: string): Promise<any> {
        const accessToken = await this.getAccessToken()
        var config = {
            method: 'get',
            url: `https://api.sandbox.paypal.com/v1/billing/plans/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };
        const response = await axios(config)
        const data = response.data
        const duplicateData = { ...data }
        duplicateData._id = data.id
        delete duplicateData.id
        const productPLanObj = new ProductPlan(duplicateData)
        const productPLan = await productPLanObj.save()
        return productPLan
    }

    async getPaymentVerification(id: string, userId: string): Promise<any> {
        const accessToken = await this.getAccessToken()
        var config = {
            method: 'get',
            url: `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };
        const response = await axios(config)
        const data = response.data
        const res = await this.subscription.create(data, userId)
        return res
    }

}