import axios from "axios";
import QueryString from "qs";

export default class PaypalToken {
    async getAccessToken(): Promise<string> {
        var data = QueryString.stringify({
            'grant_type': 'client_credentials'
        });
        var auth = 'Basic ' + Buffer.from(process.env.PAYPAL_CLIENT_ID + ':' + process.env.PAYPAL_SECRET_KEY).toString('base64');
        var config = {
            method: 'post',
            url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': auth
            },
            data: data
        };

        const response = await axios(config)
        const accessToken = response.data.access_token
        return accessToken
    }

}