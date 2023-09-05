import express from 'express'
import { RequestData, RequestQueryData } from '../utils/interfaces'
import { ParsedQs } from "qs";

export default abstract class BaseController {
  getRequestData<T>(req: express.Request): RequestData<T> {
    return {
      body: req.body,
      queryParams: req.params,
    }
  }
  
  getQueryData(req: express.Request): RequestQueryData<ParsedQs> {
    return {
      query: req.query,
    }
  }
}