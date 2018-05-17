import {Doctors} from './doctors';

export interface Location {
    id?: number;
    city?: string;

    doctors?: Doctors;
    patients?: any;
}
