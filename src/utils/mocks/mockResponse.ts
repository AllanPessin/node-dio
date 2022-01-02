import { Response } from "express";

export type MakeMockResponse<TResult> = Response & {
  state: {
    status?: number,
    json?: TResult | unknown
  }
}

export function makeMockResponse<TResult>() {
  const response = {
    state: {}
  } as MakeMockResponse<TResult>

  response.status = (status: number) => {
    response.state.status = status
    return response
  }

  response.json = (json: TResult) => {
    response.state.json = json
    return response
  }

  return response
}