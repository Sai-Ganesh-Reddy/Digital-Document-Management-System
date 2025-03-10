export interface User {
    id:string;
    name: string;
    email: string;
    avatar?:string;
}

export interface Document {
    id: string;
    name:string;
    type:string;
    size: number;
    uploadDate: Date;
    lastModified: Date;
    signed: boolean;
    shared: boolean;
    ownerId: string;
    thumbnail?:string;
    url?:string;
}

export interface SignatureOptions {
    color:string;
    width:number;
}