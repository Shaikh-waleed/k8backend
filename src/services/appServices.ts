import User from "../models/userSchema";


export default class AppServices {
    constructor() {
    }

    async getProfile(id: string): Promise<any> {
        let user: any = await User.findById({ _id: id });
        return {
            fullName: user.fullName,
            email: user.email,
            country:user.country,
            success: true,
        }
    }

}