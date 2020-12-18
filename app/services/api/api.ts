import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem, GeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import env from "../../config/env"

const MAIL_ACCEPTED = 200
/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: env.META_API_KEY,
      },
    })
  }

  /**
   * Generalized GET requests for responses that require no further parsing
   * @param uri Path to get
   * @param params
   */
  private async get<T>(uri, params = {}): Promise<{ kind: "ok"; data: T } | GeneralApiProblem> {
    const response: ApiResponse<T> = await this.apisauce.get(uri, params)
    if (!response.ok) {
      return getGeneralApiProblem(response)
    } else {
      return { kind: "ok", data: response.data }
    }
  }

  /**
   * Get a point of interest by id
   * @param id POI id
   */
  async getPOI(id: string): Promise<Types.GetPOIResult> {
    return this.get<Types.GetPOIResult>(`/pois/${id}`)
  }

  /**
   * Sends an email to be processed by the feedback system
   * @param rating Smiley rating
   * @param feedback Free feedback
   */
  async sendFeedback(rating: string, feedback: string): Promise<Types.SendEmailResult> {
    const data = {
      service_id: "sendgrid", // eslint-disable-line @typescript-eslint/camelcase
      template_id: "feedback", // eslint-disable-line @typescript-eslint/camelcase
      user_id: env.EMAIL_USER_ID, // eslint-disable-line @typescript-eslint/camelcase
      template_params: { // eslint-disable-line @typescript-eslint/camelcase
        rating,
        feedback,
      },
    }
    const response = await this.apisauce.axiosInstance.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      data,
    )
    if (response.status === MAIL_ACCEPTED) {
      return { kind: "ok", data: response.data }
    } else {
      return { kind: "unknown", temporary: true }
    }
  }
}
