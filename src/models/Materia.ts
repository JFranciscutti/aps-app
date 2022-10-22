export interface Materia {
    id?: string;
    name: string;
    year: number;
    cuat: number;
    state?: string;
    lastUpdate?: Date;
    correlativas?: string[];
}