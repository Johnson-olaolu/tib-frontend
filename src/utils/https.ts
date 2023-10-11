/* eslint-disable no-param-reassign */
import axios from "axios";
import QueryString from "query-string";
import { IDelete, IGet, IPatch, IPost, IPut } from "./types";
import { store } from "@/store";
import { RootState } from "@/store/appSlice";

class HttpFacade {
  private http;

  constructor() {
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`,
      headers: { "content-type": "application/json" },
    });

    this.http.interceptors.request.use(
      (config) => {
        const token = (store.getState() as RootState).auth.token;
        if (token) config.headers!.Authorization = "Bearer " + token;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  post = async ({ url, body }: IPost) => {
    const response = await this.http.post(url, body);
    return response.data;
  };

  patch = async ({ url, body }: IPatch) => {
    const response = await this.http.patch(url, body);
    return response.data;
  };

  get = async ({ url, query = {} }: IGet) => {
    const queryString = `?${QueryString.stringify(query)}`;
    const response = await this.http.get(`${url + queryString}`);
    return response.data;
  };

  delete = async ({ url }: IDelete) => {
    const response = await this.http.delete(url);
    return response.data;
  };

  put = async ({ url, body }: IPut) => {
    const response = await this.http.put(url, body);
    return response.data;
  };

  updateProfile = async ({ url, body }: IPatch) => {
    const response = await this.http.patch(url, body, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  };
}

export default new HttpFacade();
