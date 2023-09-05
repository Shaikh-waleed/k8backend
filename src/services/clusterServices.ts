import { Response } from "express";
// import fs from "fs"; // Example code to run Terraform script from Node API using Makefile
import { RequestData, Cluster } from "../utils/interfaces";
import ClusterSchema from "../models/clusterSchema";
// import ChildProcess from "../utils/childProcess"; // Example code to run Terraform script from Node API using Makefile

export default class ClusterServices {
  // Example code to run Terraform script from Node API using Makefile
  // childProcess: ChildProcess;
  // constructor() {
  //   this.childProcess = new ChildProcess();
  // }

  async getClusters(): Promise<any> {
    const clusters = await ClusterSchema.find();

    return {
      data: clusters,
      success: true,
      message: "Successfully fetched all clusters.",
    };
  }

  async createCluster(request: RequestData<Cluster>): Promise<any> {
    const newCluster = new ClusterSchema({
      clusterType: request.body.clusterType,
      userId: request.body.userId,
      cloudId: request.body.cloudId,
      cloudType: request.body.cloudType,
      name: request.body.name,
      version: request.body.version,
      region: request.body.region,
      nodeSize: request.body.nodeSize,
      resourceGroupName: request.body.resourceGroupName,
      workerNodes: request.body.workerNodes,
    });

    const cluster = await newCluster.save();

    return {
      data: {
        _id: cluster.id,
        userId: cluster.userId,
        cloudId: cluster.cloudId,
        cloudType: cluster.cloudType,
        clusterType: cluster.clusterType,
        name: cluster.name,
        version: cluster.version,
        region: cluster.region,
        nodeSize: cluster.nodeSize,
        resourceGroupName: cluster.resourceGroupName,
        workerNodes: cluster.workerNodes,
      },
      success: true,
      message: "Cluster sucessfully created.",
    };
  }

  async getClusterById(id: string): Promise<any> {
    const cluster = await ClusterSchema.findById(id);

    return {
      data: cluster,
      success: true,
      message: "Successfully fetched cluster.",
    };
  }

  async updateClusterById(request: RequestData<Cluster>, response: Response): Promise<any> {
    const { id } = request.queryParams;
    const cluster = await ClusterSchema.findById(id);
    if (cluster?.userId == request.body.userId) {
      const updatedCluster = await ClusterSchema.findByIdAndUpdate(
        id,
        {
          cloudId: request.body.cloudId,
          cloudType: request.body.cloudType,
          name: request.body.name,
          version: request.body.version,
          region: request.body.region,
          nodeSize: request.body.nodeSize,
          resourceGroupName: request.body.resourceGroupName,
          workerNodes: request.body.workerNodes,
        },
        { new: true }
      );

      if (updatedCluster) {
        return {
          data: {
            _id: updatedCluster.id,
            cloudId: updatedCluster.cloudId,
            cloudType: updatedCluster.cloudType,
            name: updatedCluster.name,
            version: updatedCluster.version,
            region: updatedCluster.region,
            nodeSize: updatedCluster.nodeSize,
            resourceGroupName: updatedCluster.resourceGroupName,
            workerNodes: updatedCluster.workerNodes,
          },
          success: true,
          message: "Cluster sucessfully updated.",
        };
      }
    } else {
      response
        .set({ json: { "Content-Type": "application/json" } })
        .status(400)
        .send({
          response: {
            success: false,
            error: "You don't have access to update this cluster",
          },
        });
    }
  }

  async deleteClusterById(id: string): Promise<any> {
    await ClusterSchema.findByIdAndRemove(id);

    return {
      success: true,
      message: `Cluster id = ${id} sucessfully deleted.`,
    };
  }

  async getClusterByUser(userId: string): Promise<any> {
    const cloudProfiles = await ClusterSchema.find({ userId });

    return {
      data: cloudProfiles,
      success: true,
      message: "Successfully fetched all clusters by user id.",
    };
  }

  // Example code to run Terraform script from Node API using Makefile
  // async runTerraform(request: any, response: any): Promise<any> {
  //   const { accessKeyId, secretAccessKey, region, dockerImageId, dockerImageName } = request.body;

  //   const makefileScript = this.generateMakefileScript(dockerImageName, dockerImageId, accessKeyId, secretAccessKey, region);

  //   const makefileScriptFormatted = makefileScript.replace(/\s\s+/g, "\n\t");

  //   fs.writeFileSync("Makefile", makefileScriptFormatted);

  //   try {
  //     const makePull = await this.childProcess.spawnAsync("make", ["pull"]);
  //     const makeRun = await this.childProcess.spawnAsync("make", ["run"]);
  //     console.log(makePull);
  //     console.log(makeRun);
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   return {
  //     data: request.body,
  //     success: true,
  //     message: "Successfully run terraform.",
  //   };
  // }

  // Example code to run Terraform script from Node API using Makefile
//   generateMakefileScript(dockerImageName: string, dockerImageId: string, accessKeyId: string, secretAccessKey: string, region: string) {
//     return `
// pull:
//     docker pull ${dockerImageName}
//     docker images
// run:
//     docker run ${dockerImageId}
//     `;
//   }
}
