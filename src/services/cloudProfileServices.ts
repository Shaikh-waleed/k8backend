import { Response } from "express";
import mongoose from "mongoose";
import CloudProfileSchema from "../models/cloudProfileSchema";
import { RequestData, RequestQueryData, CloudProfile } from "../utils/interfaces";
import AWSConfig from "../utils/awsConfig";

export default class CloudProfileServices {
  AWSConfig: AWSConfig;

  constructor() {
    this.AWSConfig = new AWSConfig();
  }

  async getCloudProfiles(): Promise<any> {
    const cloudProfiles = await CloudProfileSchema.find();

    return {
      data: cloudProfiles,
      success: true,
      message: "Successfully fetched all cloud profiles.",
    };
  }

  async createCloudProfile(request: RequestData<CloudProfile>): Promise<any> {
    const newCloudProfile = new CloudProfileSchema({
      userId: request.body.userId,
      cloudType: request.body.cloudType,
      name: request.body.name,
      region: request.body.region,
      accessKeyId: request.body.accessKeyId,
      secretAccessKey: request.body.secretAccessKey,
      databaseType: request.body.databaseType,
      resourceGroupName: request.body.resourceGroupName,
    });

    const cloudProfile = await newCloudProfile.save();

    return {
      data: {
        _id: cloudProfile.id,
        userId: cloudProfile.userId,
        cloudType: cloudProfile.cloudType,
        name: cloudProfile.name,
        region: cloudProfile.region,
        accessKeyId: cloudProfile.accessKeyId,
        secretAccessKey: cloudProfile.secretAccessKey,
        databaseType: cloudProfile.databaseType,
        resourceGroupName: cloudProfile.resourceGroupName,
      },
      success: true,
      message: "Cloud profile sucessfully created.",
    };
  }

  async getCloudProfileById(id: string): Promise<any> {
    const cloudProfile = await CloudProfileSchema.findById(id);

    return {
      data: cloudProfile,
      success: true,
      message: "Successfully fetched cloud profile.",
    };
  }

  async updateCloudProfileById(request: RequestData<CloudProfile>, response: Response): Promise<any> {
    const { id } = request.queryParams;
    const cloudProfile = await CloudProfileSchema.findById(id);
    if (cloudProfile?.userId == request.body.userId) {
      const updatedCloudProfile = await CloudProfileSchema.findByIdAndUpdate(
        id,
        {
          cloudType: request.body.cloudType,
          name: request.body.name,
          region: request.body.region,
          accessKeyId: request.body.accessKeyId,
          secretAccessKey: request.body.secretAccessKey,
          databaseType: request.body.databaseType,
          resourceGroupName: request.body.resourceGroupName,
        },
        { new: true }
      );

      if (updatedCloudProfile) {
        return {
          data: {
            _id: updatedCloudProfile.id,
            userId: updatedCloudProfile.userId,
            cloudType: updatedCloudProfile.cloudType,
            name: updatedCloudProfile.name,
            region: updatedCloudProfile.region,
            accessKeyId: updatedCloudProfile.accessKeyId,
            secretAccessKey: updatedCloudProfile.secretAccessKey,
            databaseType: updatedCloudProfile.databaseType,
            resourceGroupName: updatedCloudProfile.resourceGroupName,
          },
          success: true,
          message: "Cloud profile sucessfully updated.",
        };
      }
    } else {
      response
        .set({ json: { "Content-Type": "application/json" } })
        .status(400)
        .send({
          response: {
            success: false,
            error: "You don't have access to update this cloud profile",
          },
        });
    }
  }

  async deleteCloudProfileById(id: string): Promise<any> {
    await CloudProfileSchema.findByIdAndRemove(id);

    return {
      success: true,
      message: `Cloud profile id = ${id} sucessfully deleted.`,
    };
  }

  async getCloudProfilesByUser(userId: string): Promise<any> {
    const _userId = new mongoose.Types.ObjectId(userId);

    const cloudProfiles = await CloudProfileSchema.aggregate([
      {
        $match: {
          userId: _userId,
        },
      },
      {
        $lookup: {
          from: "clusters",
          localField: "_id",
          foreignField: "cloudId",
          as: "clusters",
        },
      },
    ]);

    return {
      data: cloudProfiles,
      success: true,
      message: "Successfully fetched all cloud profiles by user id.",
    };
  }

  async getCloudProfileRegions(request: RequestQueryData<{ region: string }>): Promise<any> {
    const { region } = request.query;
    const regions = await this.AWSConfig.getEC2Regions({ region: region || "" });

    return {
      data: regions,
      success: true,
      message: `Successfully fetched all regions.`,
    };
  }

  async getCloudProfileInstanceTypes(request: RequestQueryData<{ region: string }>): Promise<any> {
    const { region } = request.query;
    const instanceTypes = await this.AWSConfig.getEC2InstanceTypes({ region: region || "" });

    return {
      data: instanceTypes,
      success: true,
      message: `Successfully fetched all instance types.`,
    };
  }

  async getCloudProfileInstanceTypeOfferings(request: RequestQueryData<{ region: string }>): Promise<any> {
    const { region } = request.query;
    const instanceTypeOfferings = await this.AWSConfig.getEC2InstanceTypeOfferings({ region: region || "" });

    return {
      data: instanceTypeOfferings,
      success: true,
      message: `Successfully fetched all instance type offerings.`,
    };
  }

  async getCloudProfileEKSVersions(request: RequestQueryData<{ region: string }>): Promise<any> {
    const { region } = request.query;
    const eksVersions = await this.AWSConfig.getEKSVersions({ region: region || "" });

    return {
      data: eksVersions,
      success: true,
      message: `Successfully fetched all eks versions.`,
    };
  }
}
