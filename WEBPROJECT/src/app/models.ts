export interface Diary{
    id:number,
    title:string,
    body:string,
    description:string,
    isPublic:boolean,
    likes:number,
    authorId:number,
    authorName:string,
    image:string,
    bold:boolean,
    italic:boolean,
    underline:boolean,
    fontSize:string,
    fontColor:string,
    fontFamily:string,
    mood:number
}

export interface User{
    id:number,
    userName:string,
    password:string,
    mail:string,
}

export interface Category{
    id:number,
    name:string
}

export interface Commentary{
    id:number,
    body:string,
    username:string,
    userId:number,
    createdAt:string
    diary:number
}


export interface AuthToken {
    token: string;
}