import express, { NextFunction, Request, Response } from "express";
import { Router } from "../utils/interfaces";
import Authentication from "../middlewares/authenticate";
import Validate from "../middlewares/validate";
import ClusterController from "../controllers/clusterController";

export class ClusterRouter implements Router {
  app: express.Application;
  clusterController: ClusterController;
  auth: Authentication;
  validate: Validate;

  constructor(app: express.Application) {
    this.app = app;
    this.clusterController = new ClusterController();
    this.auth = new Authentication();
    this.validate = new Validate();
    this.setRoutes();
  }

  setRoutes() {
    // Example code to run Terraform script from Node API using Makefile
    // this.app.post(
    //   "/Cluster/RunTerraform",
    //   (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
    //   (req: Request, res: Response) => this.clusterController.runTerraform(req, res)
    // );

    this.app.get(
      "/Cluster/ByUser",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response) => this.clusterController.getClusterByUser(req, res)
    );

    this.app.get(
      "/Cluster",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (_: Request, res: Response) => this.clusterController.getClusters(res)
    );

    this.app.post(
      "/Cluster",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.validate.cluster(req, res, next),
      (req: Request, res: Response) => this.clusterController.createCluster(req, res)
    );

    this.app.get(
      "/Cluster/:id",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response) => this.clusterController.getClusterById(req, res)
    );

    this.app.put(
      "/Cluster/:id",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.validate.cluster(req, res, next),
      (req: Request, res: Response) => this.clusterController.updateClusterById(req, res)
    );

    this.app.delete(
      "/Cluster/:id",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response) => this.clusterController.deleteClusterById(req, res)
    );
  }
}
