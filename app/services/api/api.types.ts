import { GeneralApiProblem } from "./api-problem"

export type GetPOIResult = { kind: "ok"; data: any} | GeneralApiProblem

export type SendEmailResult = { kind: "ok"; data: any } | GeneralApiProblem
