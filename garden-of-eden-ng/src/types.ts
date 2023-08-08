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
    likes?: { [key: string]: Like }
}

interface Like {
    email: string,
    id: string
}

export interface PlantObject {
    [key: string]: Plant
}

export interface LikedPlantObject {
    [key: string]: LikedPlant
}

export interface LikedPlant {
    id: string,
    name: string,
    imageUrl: string,
    price: number
}


export interface LoginData {
    email: string;
    password: string;
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
    favourites?: { [key: string]: FavouritesData };
}

interface FavouritesData {
    id: string;
    name: string;
}