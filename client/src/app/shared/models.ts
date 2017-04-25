export interface Identity {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
}

export class User {
    name: string;
    surname: string;
    age: number;
}

export class Place {
    _id?: string;
    people: string[];
}