import axios from "axios";
import { baseURL } from "../constants/EndPoint";

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
