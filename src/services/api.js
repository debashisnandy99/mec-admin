import axios from "axios"
import { url } from "./details"

export default axios.create({
  baseURL: url(),
  timeout: 1000,
})
