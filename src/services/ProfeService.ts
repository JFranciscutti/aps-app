import { Materia } from "../models/Materia";
import { MesaExamen } from "../models/MesaExamen";
import { User } from "../models/User";
import http from "./http-common";

class ProfeService {

    createMesa(mesa: MesaExamen) {
        return http.post<MesaExamen, Promise<MesaExamen>>("http://localhost:8080/profe/create-mesa", mesa);
    }

    getMesas() {
        return http.get<any, Promise<MesaExamen[]>>(`http://localhost:8080/profe/all-mesas`);
    }

    getMesasByProfesor(id: number) {
        return http.get<string, Promise<MesaExamen[]>>(`http://localhost:8080/profe/${id}/mesas`);
    }

    inscribir(materia: Materia, user: User) {
        return http.post(`http://localhost:8080/inscripcion/${materia.id}/alumno/${user.id}`);
    }
}

export default new ProfeService();