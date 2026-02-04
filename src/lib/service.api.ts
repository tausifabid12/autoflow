import axios, { AxiosError } from "axios";
// import { IApiResponse } from "@/interfaces";
// import { AxiosFailureRes } from "@/types";
import { getAccessToken } from "@/lib/utils";


export const ServiceAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 10000,
});

ServiceAPI.interceptors.request.use((reqConfig) => {
  const token = getAccessToken();
  reqConfig.headers["Authorization"] = `Bearer ${token}`;
  return reqConfig;
});

ServiceAPI.interceptors.response.use(
  (res) => {
    res.data["statusCode"] = res.data.code || res.status;
    return res;
  },
  (error: AxiosError) => {
    console.log("<-------- Response Error ------------>");
    console.log({
      responseUrl: error.request?.res?.responseUrl,
      response: error.response?.data,
      headers: error.config?.headers,
    });
    if (axios.isCancel(error)) {
      // Handle request cancellation
      console.log("Request canceled:", error.message);
    }

    const err = {
      name: "Backend Error",
      message: "Something went wrong",
      statusCode: error.response?.status,
      success: false,
      ...(error.response?.data || {}),
    };

    if (error.code === "ERR_NETWORK") {
      err["message"] = "No Network Connection!";
      err["statusCode"] = 400;
    }

    // console.error("RequestError: ", error);

    return Promise.reject(err);
  }
);
