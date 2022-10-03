import axios from "axios";
import { User } from "../models/User";
import http from "./http-common";

class UserService {

    createUser(user: User): any {
        http.post("http://localhost:8080/usuarios/create", user);
    }
}

export default new UserService();