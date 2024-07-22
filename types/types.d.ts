export type NEWS = {
    headline:string;
    hostname:string;
    imageUrl:string;
    _id:string;
    publishedAt:string;
    tags:string[];
    summary:string;
}

export interface USER{
    firstname:string;
    lastname:string;
    phone:string;
    email:string;
    password:string;
}