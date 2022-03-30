import axios from "axios";
import { getTokenFormat } from "../../helper";

export function getAllBlogs() {
  return axios.get(`/blogs`, getTokenFormat());
}

export function getBlogById(id: string) {
  return axios.get(`/blogs/${id}`, getTokenFormat());
}
