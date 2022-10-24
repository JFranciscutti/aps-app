import axios from "axios";
import environment from "../environment.json";

export default axios.create({
    baseURL: environment.baseURL,
    headers: { "Content-Type": "application/json" }
});