export interface Plant {
    name: string;
    price: number;
    light: string;
    temperature: string;
    humidity: string;
    fertilizer: string;
    water: string;
    imageUrl: string;
    id: string;
}

export interface PlantObject {
    [key: string]: Plant
}

export interface LoginData {
    username: string;
    password: string
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    ["repeat-password"]: string;
}

export interface User {
    username: string;
    email: string;
    password: string;
    id: string;
}
