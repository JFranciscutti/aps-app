export interface MateriaAdmin {
    id: number;
    name: string;
    year: number;
    cuat: number;
    correlativas: MateriaAdmin[];
}