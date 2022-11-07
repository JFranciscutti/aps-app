import { Materia } from "../models/Materia";
import { MesaExamen } from "../models/MesaExamen";
import { User } from "../models/User";
import http from "./http-common";
import environment from "../environment.json";

class ProfeService {

    createMesa(mesa: MesaExamen) {
        return http.post<MesaExamen, Promise<MesaExamen>>(`${environment.baseURL}/profe/create-mesa`, mesa);
    }

    getMesas() {
        return http.get<any, Promise<MesaExamen[]>>(`${environment.baseURL}/profe/all-mesas`);
    }

    getMesasByProfesor(id: number) {
        return http.get<string, Promise<MesaExamen[]>>(`${environment.baseURL}/profe/${id}/mesas`);
    }

    inscribir(mesaExamenId: number, user: User) {
        return http.get(`${environment.baseURL}/profe/${user.id}/inscripcion/${mesaExamenId}`);
    }
}

export default new ProfeService();