import { Request } from "express";
import { Params } from "express-serve-static-core";

interface IMockRequest {
  params?: Params,
}

export function MakeMockRequest({ params }: IMockRequest) {
  const request = {
    params: params || {}
  } as unknown

  return request as Request
}