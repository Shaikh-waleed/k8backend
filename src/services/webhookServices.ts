import SubEvent from "../models/subEventSchema";
import SubcriptionServices from "./subscriptionServices";

export default class WebhookServices {
    service :SubcriptionServices
    constructor() {
        this.service = new SubcriptionServices()
    }

    async webhook(data: any, header: any): Promise<any> {
        const subscriptionObj = new SubEvent(data)
        const subscription = await subscriptionObj.save()
        const { resource } = subscription
        const res = await this.service.update(resource)
        return res
    }

}