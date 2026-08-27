export const roleType = ["admin", "user"];

export type RoleType = (typeof roleType)[number];

export interface User {
    id : number | null;
    name : String;
    type  : String;
    email : String;
    password : String;
    role : RoleType;
}

export interface CreateUserInput {
    name : String;
    type  : String;
    email : String;
    password : String;
    role : RoleType;
}

export type UpdateUserInput = Partial<CreateUserInput>;