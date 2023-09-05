import * as AWS from "aws-sdk";
import { AWSConfigOption, Region } from "./interfaces";

export default class AWSConfig {
  updateAWSConfig({ region, accessKeyId, secretAccessKey }: AWSConfigOption) {
    AWS.config.update({
      region: region,
      accessKeyId: accessKeyId || process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: secretAccessKey || process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async getEC2Regions({ region, accessKeyId, secretAccessKey }: AWSConfigOption): Promise<Region[]> {
    this.updateAWSConfig({ region, accessKeyId, secretAccessKey });

    const ec2 = new AWS.EC2();

    try {
      const data = await ec2.describeRegions().promise();
      return data.Regions || [];
    } catch (error) {
      console.log("Error", error);
      return [];
    }
  }

  async getEC2InstanceTypes({ region, accessKeyId, secretAccessKey }: AWSConfigOption): Promise<(string | undefined)[]> {
    this.updateAWSConfig({ region, accessKeyId, secretAccessKey });

    const ec2 = new AWS.EC2();

    try {
      const data = await ec2.describeInstanceTypes().promise();
      const instanceTypes = data.InstanceTypes?.map((instanceType) => instanceType.InstanceType);
      return instanceTypes || [];
    } catch (error) {
      console.log("Error", error);
      return [];
    }
  }

  async getEC2InstanceTypeOfferings({ region, accessKeyId, secretAccessKey }: AWSConfigOption): Promise<(string | undefined)[]> {
    this.updateAWSConfig({ region, accessKeyId, secretAccessKey });

    const ec2 = new AWS.EC2();

    try {
      const data = await ec2.describeInstanceTypeOfferings().promise();
      const instanceTypeOfferings = data.InstanceTypeOfferings?.map((instanceType) => instanceType.InstanceType);
      return instanceTypeOfferings || [];
    } catch (error) {
      console.log("Error", error);
      return [];
    }
  }

  async getEKSVersions({ region, accessKeyId, secretAccessKey }: AWSConfigOption): Promise<any> {
    this.updateAWSConfig({ region, accessKeyId, secretAccessKey });

    const eks = new AWS.EKS();

    try {
      const data = await eks.describeAddonVersions().promise();
      return data.addons || [];
    } catch (error) {
      console.log("Error", error);
      return [];
    }
  }
}
