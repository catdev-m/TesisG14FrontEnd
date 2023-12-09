import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin } from 'src/app/interfaces/auth/user-login';
import { Result } from 'src/app/interfaces/shared/result';
import { Token } from 'src/app/interfaces/auth/token';
import { Envelop } from 'src/app/interfaces/shared/envelop';
import { LogedUser } from 'src/app/interfaces/auth/loged-user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    urlApi:string=`${environment.memoriesUrlAPI}/api/auth`;
    constructor(private http:HttpClient) { }

    loginUser(user:UserLogin){
		const headers = {
			headers: new HttpHeaders({'Anonymous': 'true','Content-Type':  'application/json'})
		}
        return this.http.post<Envelop<Token>>(`${this.urlApi}/login`,JSON.stringify(user),headers);
    }

    getPermissionsAdnRole(user:any){
        const headers = {
			headers: new HttpHeaders({'Anonymous': 'true','Content-Type':  'application/json'})
		}
        return this.http.post<Envelop<LogedUser>>(`${this.urlApi}/menusAndPemisions`,JSON.stringify(user),headers);
    }

}
