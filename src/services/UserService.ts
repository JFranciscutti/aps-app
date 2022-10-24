import axios, { AxiosResponse } from "axios";
import { User, UserLogin } from "../models/User";
import http from "./http-common";
import environment from "../environment.json";

class UserService {

    createUser(user: User) {
        return http.post<User, Promise<User>>(`${environment.baseURL}/usuarios/create`, user);
    }

    login(user: UserLogin) {
        return http.post<User, Promise<User>>(`${environment.baseURL}/usuarios/login/${user.email}`, user.password)
    }

    update(userToUpdate: User) {
        return http.put<User, Promise<User>>(`${environment.baseURL}/usuarios/update`, userToUpdate)
    }

    getByEmailAndPassword(email: string, password: string) {
        return http.post<any, Promise<User>>(`${environment.baseURL}/usuarios/get/${email}`, password);
    }
}

export default new UserService();