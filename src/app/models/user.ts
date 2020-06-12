export interface User {
    firstName:string; 
    lastName:string;
    email:string 
    password:string; 
    userTypeFK:number; 
    active: Boolean; 
    creationDate: Date; 
    modificationDate : Date;
    totalRecords: number;
}
