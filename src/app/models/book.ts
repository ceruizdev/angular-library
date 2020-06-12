import { Author } from './author';
import { Category } from './category';

export interface Book {
    id:number; 
    isbn:string;
    name:string;
    details:string;
    authorFK:number;
    categoryFK:number;
    publicationDate: Date;
    creationDate: Date;
    modificarionDate: Date;
    totalRecords: number;
}
