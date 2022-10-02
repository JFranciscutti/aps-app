import axios from "axios";
import { User } from "../models/User";

class UserService {

    createUser(user: User) {
        axios.post("http://localhost:8080/usuarios/create", user);
    }
}

export default new UserService();