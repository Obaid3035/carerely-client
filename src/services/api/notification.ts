import axios from "axios";
import { getTokenFormat } from "../../utils/helper";

export const getNotification = () => {
  return axios.get(`/notification`, getTokenFormat())
}
