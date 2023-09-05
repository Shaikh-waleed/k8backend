import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { CloudType, ClusterType } from "../utils/enums";

export default class Validate {
  cloudProfile(req: Request, res: Response, next: NextFunction) {
    const { cloudType } = req.body;

    let schema = null;

    switch (cloudType) {
      case CloudType.AMAZON_WEB_SERVICES:
        schema = Joi.object({
          cloudType: Joi.number().required(),
          name: Joi.string().required(),
          region: Joi.string().required(),
          accessKeyId: Joi.string().required(),
          secretAccessKey: Joi.string().required(),
          databaseType: Joi.string().optional(),
          resourceGroupName: Joi.string().optional(),
        });
        break;

      case CloudType.MICROSOFT_AZURE:
        schema = Joi.object({
          cloudType: Joi.number().required(),
          name: Joi.string().required(),
          region: Joi.string().required(),
          accessKeyId: Joi.string().optional(),
          secretAccessKey: Joi.string().optional(),
          databaseType: Joi.string().required(),
          resourceGroupName: Joi.string().required(),
        });
        break;

      default:
        return res.status(400).send("Cloud type is invaild");
    }

    const validate = schema.validate(req.body);

    if (validate.error) return res.status(400).send(validate.error.details[0].message);

    next();
  }

  cluster(req: Request, res: Response, next: NextFunction) {
    const { cloudType, clusterType } = req.body;

    let schema = null;

    switch (cloudType) {
      case CloudType.AMAZON_WEB_SERVICES:
        schema = Joi.object({
          clusterType: Joi.number().required(),
          cloudId: clusterType === ClusterType.DEDICATED ? Joi.string().optional() : Joi.string().required(),
          cloudType: Joi.number().required(),
          name: Joi.string().required(),
          version: Joi.string().required(),
          region: Joi.string().required(),
          nodeSize: Joi.string().required(),
          resourceGroupName: Joi.string().optional(),
          workerNodes: Joi.number().optional(),
        });
        break;

      case CloudType.MICROSOFT_AZURE:
        schema = Joi.object({
          clusterType: Joi.number().required(),
          cloudId: clusterType === ClusterType.DEDICATED ? Joi.string().optional() : Joi.string().required(),
          cloudType: Joi.number().required(),
          name: Joi.string().required(),
          version: Joi.string().required(),
          region: Joi.string().required(),
          nodeSize: Joi.string().optional(),
          resourceGroupName: Joi.string().required(),
          workerNodes: Joi.number().required(),
        });
        break;

      default:
        return res.status(400).send("Cloud type is invaild");
    }

    const validate = schema.validate(req.body);

    if (validate.error) return res.status(400).send(validate.error.details[0].message);

    next();
  }

  region(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      region: Joi.string().required(),
    });

    const validate = schema.validate(req.query);

    if (validate.error) return res.status(400).send(validate.error.details[0].message);

    next();
  }
}
