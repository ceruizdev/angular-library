import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function TransformError(error: HttpErrorResponse | string) {
    let ErrorMessage = 'An unknown error has occurred';
    if (typeof error === 'string'){
        ErrorMessage = error;
    }else if (error.error instanceof ErrorEvent){
        ErrorMessage = `Error! ${error.error.message}`;
    }else if (error.status) {
        ErrorMessage = `Request failed with ${error.status} ${error.statusText}`
    }
    return throwError(ErrorMessage);
}

