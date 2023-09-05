import express, { NextFunction, Request, Response } from "express";
import { Router } from "../utils/interfaces";
import Authentication from "../middlewares/authenticate";
import Validate from "../middlewares/validate";
import CloudProfileController from "../controllers/cloudProfileController";

export class CloudProfileRouter implements Router {
  app: express.Application;
  cloudProfileController: CloudProfileController;
  auth: Authentication;
  validate: Validate;

  constructor(app: express.Application) {
    this.app = app;
    this.cloudProfileController = new CloudProfileController();
    this.auth = new Authentication();
    this.validate = new Validate();
    this.setRoutes();
  }

  setRoutes() {
    this.app.get(
      "/CloudProfile/Regions",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.validate.region(req, res, next),
      (req: Request, res: Response) => this.cloudProfileController.getCloudProfileRegions(req, res)
    );

    this.app.get(
      "/CloudProfile/InstanceTypes",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.validate.region(req, res, next),
      (req: Request, res: Response) => this.cloudProfileController.getCloudProfileInstanceTypes(req, res)
    );

    this.app.get(
      "/CloudProfile/InstanceTypeOfferings",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.validate.region(req, res, next),
      (req: Request, res: Response) => this.cloudProfileController.getCloudProfileInstanceTypeOfferings(req, res)
    );

    this.app.get(
      "/CloudProfile/EKSVersions",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.validate.region(req, res, next),
      (req: Request, res: Response) => this.cloudProfileController.getCloudProfileEKSVersions(req, res)
    );

    this.app.get(
      "/CloudProfile/ByUser",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response) => this.cloudProfileController.getCloudProfilesByUser(req, res)
    );

    this.app.get(
      "/CloudProfile",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (_: Request, res: Response) => this.cloudProfileController.getCloudProfiles(res)
    );

    this.app.post(
      "/CloudProfile",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.validate.cloudProfile(req, res, next),
      (req: Request, res: Response) => this.cloudProfileController.createCloudProfile(req, res)
    );

    this.app.get(
      "/CloudProfile/:id",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response) => this.cloudProfileController.getCloudProfileById(req, res)
    );

    this.app.put(
      "/CloudProfile/:id",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.validate.cloudProfile(req, res, next),
      (req: Request, res: Response) => this.cloudProfileController.updateCloudProfileById(req, res)
    );

    this.app.delete(
      "/CloudProfile/:id",
      (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
      (req: Request, res: Response) => this.cloudProfileController.deleteCloudProfileById(req, res)
    );
  }
}
