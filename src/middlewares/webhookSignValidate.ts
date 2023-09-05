import { NextFunction, Request, Response } from "express";
import PaypalToken from "../utils/paypalToken";
var axios = require('axios');


export default class WebhookSignValidate extends PaypalToken {
    async validate(req: any, res: Response, next: NextFunction) {

        const auth_algo: string = req.header('PAYPAL-AUTH-ALGO');
        const cert_url: string = req.header('PAYPAL-CERT-URL');
        const transmission_id: string = req.header('PAYPAL-TRANSMISSION-ID');
        const transmission_sig: string = req.header('PAYPAL-TRANSMISSION-SIG');
        const transmission_time: string = req.header('PAYPAL-TRANSMISSION-TIME');
        const access_token = await this.getAccessToken()
        var data = JSON.stringify({
            "transmission_id": transmission_id,
            "transmission_time": transmission_time,
            "cert_url": cert_url,
            "auth_algo": auth_algo,
            "transmission_sig": transmission_sig,
            "webhook_id": "7FM11968MM821570L",
            "webhook_event": req.body
        });

        var config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            data: data
        };

        try {
            const response = await axios(config)
            const data = response.data
            if (data.verification_status === "SUCCESS") {
                next()
            } else {
                throw new Error("Token signature verification failed")
            }
        } catch (error) {
            res
                .status(401)
                .send({
                    success: false,
                    error: "Token signature verification failed"
                })
        }
    }
}
