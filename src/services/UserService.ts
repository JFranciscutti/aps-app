import axios, { AxiosResponse } from "axios";
import { User, UserLogin } from "../models/User";
import http from "./http-common";

class UserService {

    createUser(user: User) {
        return http.post<User, Promise<User>>("http://localhost:8080/usuarios/create", user);
    }

    login(user: UserLogin) {
        return http.post<User, Promise<User>>(`http://localhost:8080/usuarios/login/${user.email}`, user.password)
    }
}

export default new UserService();