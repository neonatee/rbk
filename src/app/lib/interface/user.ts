import {Doctors} from './doctors';
import {Location} from './location';

export interface User {
    auth_key?: string;
    created_at?: number;
    email?: string;
    id?: number;
    password_hash?: string;
    password_reset_token?: string;
    status?: number;
    updated_at?: number;
    username?: string;

    doctors?: Doctors;
    profile?: UserProfile;
    authLog?: any;
    userTasks?: any;
    userTaskCustomer?: any;
    secretKey?: any;
}


export interface UserProfile {
    gender?: number;
    id?: number;
    location?: number;
    name?: string;
    phone?: string;
    surname?: string;

    doctors?: Doctors;
    userLocation?: Location;
}
