import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { Si_permisosResponseInterface } from './si_permisos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { Si_permisosInterface } from './si_permisos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class Si_permisosService {
    private actionUrl: string;
    private headers: Headers;
    private endPoint: string;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.endPoint = `${this._configuration.ServerWithApiUrl}si_permisos`;
       }
       all = () : Observable<Si_permisosResponseInterface> => {
           return this._http.get(this.endPoint)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<Si_permisosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( si_permiso: Si_permisosInterface ) : Observable<Si_permisosResponseInterface> => {
           return this._http.patch(this.endPoint, si_permiso, { headers: this.headers })
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<Si_permisosResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<Si_permisosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<Si_permisosResponseInterface> => {
           return this._http.get(`${this.endPoint}`)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( si_permiso: Si_permisosInterface ) : Observable<Si_permisosResponseInterface> => {
           return this._http.post(this.endPoint, si_permiso, { headers: this.headers })
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
