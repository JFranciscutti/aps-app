import { Materia } from "../models/Materia";
import { User } from "../models/User";
import { Roles } from "../utils/Roles";
import http from "./http-common";

class AdminService {

    createMateria(materia: Materia) {
        return http.post<Materia, Promise<Materia>>("http://localhost:8080/admin/create-materia", materia);
    }

    getMaterias() {
        return http.get<any, Promise<Materia[]>>(`http://localhost:8080/admin/all-materias`);
    }

    getProfesores() {
        return http.get<any, Promise<User[]>>(`http://localhost:8080/usuarios/get-by-role/${Roles.PROFESOR}`);
    }

    getAlumnos() {
        return http.get<any, Promise<User[]>>(`http://localhost:8080/usuarios/get-by-role/${Roles.ALUMNO}`);
    }
}

export default new AdminService();