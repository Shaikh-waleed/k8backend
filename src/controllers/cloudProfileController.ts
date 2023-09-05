import { Request, Response } from "express";
import CloudProfileServices from "../services/cloudProfileServices";
import BaseController from "./baseController";
import { CloudProfile, reqTokenInterface } from "../utils/interfaces";

export default class CloudProfileController extends BaseController {
  cloudProfileServices: CloudProfileServices;
  constructor() {
    super();
    this.cloudProfileServices = new CloudProfileServices();
  }

  async getCloudProfiles(res: Response): Promise<void> {
    try {
      const response = await this.cloudProfileServices.getCloudProfiles();
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.message,
            },
          });
      }
    }
  }

  async createCloudProfile(req: reqTokenInterface, res: Response): Promise<void> {
    try {
      const reqData = this.getRequestData<CloudProfile>(req);
      reqData.body.userId = req.user?.id;
      const response = await this.cloudProfileServices.createCloudProfile(reqData);
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.message,
            },
          });
      }
    }
  }

  async getCloudProfileById(req: Request, res: Response): Promise<void> {
    try {
      const reqData = this.getRequestData(req);
      const { id } = reqData.queryParams;
      const response = await this.cloudProfileServices.getCloudProfileById(id || "");
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.message,
            },
          });
      }
    }
  }

  async updateCloudProfileById(req: reqTokenInterface, res: Response): Promise<void> {
    try {
      const reqData = this.getRequestData<CloudProfile>(req);
      reqData.body.userId = req.user?.id;
      const response = await this.cloudProfileServices.updateCloudProfileById(reqData, res);
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.message,
            },
          });
      }
    }
  }

  async deleteCloudProfileById(req: Request, res: Response): Promise<void> {
    try {
      const reqData = this.getRequestData(req);
      const { id } = reqData.queryParams;
      const response = await this.cloudProfileServices.deleteCloudProfileById(id || "");
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.name,
            },
          });
      }
    }
  }

  async getCloudProfilesByUser(req: reqTokenInterface, res: Response): Promise<void> {
    try {
      const response = await this.cloudProfileServices.getCloudProfilesByUser(req.user?.id || "");
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.message,
            },
          });
      }
    }
  }

  async getCloudProfileRegions(req: Request, res: Response): Promise<void> {
    try {
      const reqData = this.getQueryData(req);
      const response = await this.cloudProfileServices.getCloudProfileRegions(reqData);
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.message,
            },
          });
      }
    }
  }

  async getCloudProfileInstanceTypes(req: Request, res: Response): Promise<void> {
    try {
      const reqData = this.getQueryData(req);
      const response = await this.cloudProfileServices.getCloudProfileInstanceTypes(reqData);
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.message,
            },
          });
      }
    }
  }

  async getCloudProfileInstanceTypeOfferings(req: Request, res: Response): Promise<void> {
    try {
      const reqData = this.getQueryData(req);
      const response = await this.cloudProfileServices.getCloudProfileInstanceTypeOfferings(reqData);
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.message,
            },
          });
      }
    }
  }

  async getCloudProfileEKSVersions(req: Request, res: Response): Promise<void> {
    try {
      const reqData = this.getQueryData(req);
      const response = await this.cloudProfileServices.getCloudProfileEKSVersions(reqData);
      res
        .set({ json: { "Content-Type": "application/json" } })
        .status(200)
        .send(JSON.stringify(response));
    } catch (err) {
      if (err instanceof Error) {
        res
          .set({ json: { "Content-Type": "application/json" } })
          .status(400)
          .send({
            response: {
              success: false,
              error: err.message,
            },
          });
      }
    }
  }
}
