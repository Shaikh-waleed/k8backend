import { Request, Response } from "express";
import ClusterServices from "../services/clusterServices";
import BaseController from "./baseController";
import { reqTokenInterface, Cluster } from "../utils/interfaces";

export default class ClusterController extends BaseController {
  clusterServices: ClusterServices;
  constructor() {
    super();
    this.clusterServices = new ClusterServices();
  }

  async getClusters(res: Response): Promise<void> {
    try {
      const response = await this.clusterServices.getClusters();
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

  async createCluster(req: reqTokenInterface, res: Response): Promise<void> {
    try {
      const reqData = this.getRequestData<Cluster>(req);
      reqData.body.userId = req.user?.id;
      const response = await this.clusterServices.createCluster(reqData);
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

  async getClusterById(req: Request, res: Response): Promise<void> {
    try {
      const reqData = this.getRequestData(req);
      const { id } = reqData.queryParams;
      const response = await this.clusterServices.getClusterById(id || "");
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

  async updateClusterById(req: reqTokenInterface, res: Response): Promise<void> {
    try {
      const reqData = this.getRequestData<Cluster>(req);
      reqData.body.userId = req.user?.id;
      const response = await this.clusterServices.updateClusterById(reqData, res);
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

  async deleteClusterById(req: Request, res: Response): Promise<void> {
    try {
      const reqData = this.getRequestData(req);
      const { id } = reqData.queryParams;
      const response = await this.clusterServices.deleteClusterById(id || "");
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

  async getClusterByUser(req: reqTokenInterface, res: Response): Promise<void> {
    try {
      const response = await this.clusterServices.getClusterByUser(req.user?.id || "");
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

  // Example code to run Terraform script from Node API using Makefile
  // async runTerraform(req: any, res: any): Promise<void> {
  //   try {
  //     const response = await this.clusterServices.runTerraform(req, res);
  //     res
  //       .set({ json: { "Content-Type": "application/json" } })
  //       .status(200)
  //       .send(JSON.stringify(response));
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       res
  //         .set({ json: { "Content-Type": "application/json" } })
  //         .status(400)
  //         .send({
  //           response: {
  //             success: false,
  //             error: err.message,
  //           },
  //         });
  //     }
  //   }
  // }
}
