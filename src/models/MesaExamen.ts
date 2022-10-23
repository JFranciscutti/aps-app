import { Materia } from "./Materia";
import { User } from "./User";

export interface MesaExamen {
    materia: Materia;
    alumnos: User[];
    fecha: Date;
    inicioInscripcion: Date;
    finInscripcion: Date;
    profesor: User;
}