import { Materia } from "../models/Materia";
import { User } from "../models/User";
import { Roles } from "../utils/Roles";
import http from "./http-common";
import environment from "../environment.json";

class AdminService {

    createMateria(materia: Materia) {
        return http.post<Materia, Promise<Materia>>(`${environment.baseURL}/admin/create-materia`, materia);
    }

    getMaterias() {
        return http.get<any, Promise<Materia[]>>(`${environment.baseURL}/admin/all-materias`);
    }

    getProfesores() {
        return http.get<any, Promise<User[]>>(`${environment.baseURL}/usuarios/get-by-role/${Roles.PROFESOR}`);
    }

    getAlumnos() {
        return http.get<any, Promise<User[]>>(`${environment.baseURL}/usuarios/get-by-role/${Roles.ALUMNO}`);
    }
}

export default new AdminService();