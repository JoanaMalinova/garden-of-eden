interface Like {
    email: string,
    id: string
}

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
    likes: { [key: string]: Like } | null;
    inCart: { [key: string]: boolean } | null;
}

export interface PlantObject {
    [key: string]: Plant
}

export interface LikedPlant {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    likedOn: EpochTimeStamp
}

export interface LikedPlantObject {
    [key: string]: LikedPlant
}

export interface PlantInCart {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    quantity: number,
    addedOn: EpochTimeStamp
}

export interface PlantInCartObject {
    [key: string]: PlantInCart
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
    favourites: { [key: string]: LikedPlantObject } | null;
    cart: { [key: string]: PlantInCartObject } | null;
}

