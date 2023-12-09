import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogedUser } from 'src/app/interfaces/auth/loged-user';
import { Envelop } from 'src/app/interfaces/shared/envelop';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/administration/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  	private urlApi:string=`${environment.memoriesUrlAPI}/api/admin/users`;
  	constructor(private http:HttpClient) { }

	getUserDetail(data:any){
		return this.http.post<LogedUser>(`${this.urlApi}/permissionsAndRoles`,JSON.stringify(data));
	}

	getAllUsers(){
		return this.http.get<Envelop<User[]>>(`${this.urlApi}?`);
	}

	createUser(user:User){
		return this.http.post<User>(this.urlApi,JSON.stringify(user));
	}
}
