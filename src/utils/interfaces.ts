import { Request } from "express"
import { type } from "os"

export type RequestData<T> = {
    body: T,
    queryParams: Partial<{ id: string }>,
}

export type RequestQueryData<T> = {
    query: Partial<T>,
}

export type signUpBody = {
    fullName: string,
    email: string,
    password: string,
    country: string,
}

export type loginBody = Omit<signUpBody, "fullName" & "country">

export type Router = {
    setRoutes(): void
}

export interface reqTokenInterface extends Request {
    user?: {
        id: string
    }
}

export interface CloudProfile {
    userId?: string,
    cloudType: number,
    name: string,
    accessKeyId?: string,
    secretAccessKey?: string,
    region: string,
    databaseType?: string,
    resourceGroupName?: string,
}

export interface Cluster {
    clusterType: number,
    userId?: string,
    cloudId: string,
    cloudType: number,
    name: string,
    version: string,
    region: string,
    nodeSize?: string,
    resourceGroupName?: string,
    workerNodes?: number,
}

export interface AWSConfigOption {
    region: string, 
    accessKeyId?: string, 
    secretAccessKey?: string,
}

export interface Region {
    RegionName?: string,
    Endpoint?: string,
}
