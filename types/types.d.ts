export type NEWS = {
    headline:string;
    hostname:string;
    imageUrl:string;
    _id:string;
    publishedAt:string;
    tags:string[];
    summary:string;
}

export interface LoginUser{
    email:string;
    password:string;
}

export interface USER extends LoginUser{
    firstName:string;
    lastName:string;
}

export type UserVerify = {
    email:string;
    otp:string;
}

export type LogoutUser = {
    email:string;
    otp:string;
}