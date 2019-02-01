import {HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {Part} from './part';
import { map, catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

@Injectable()
export class PartService{

    constructor(private _httpService: HttpClient){}
    private getUrl = 'http://localhost:8080/api/part/';
>>>>>>> ee75eba9784bc9467e942f5b5e5914c1f93dbe7c

    getAllParts(): Observable<Part[]>{
        return this._httpService.get<Array<Part>>(this.getUrl)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
    }

    addPart(part : Part): Observable<Part> {
        if(part.id){
            return this._httpService.put<Part>(`${this.getUrl}/${part.id}`, part);
        } else {
            return this._httpService.post<Part>(this.getUrl, part);
        }
    }

    deletePart(partId: string): Observable<Part>{
        return this._httpService.delete<Part>(`${this.getUrl}/${partId}`)
    }
    
}