import { Guid } from 'typescript-guid';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Envelop } from 'src/app/interfaces/shared/envelop';
import { Rol } from 'src/app/interfaces/administration/rol';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private urlApi:string=`${environment.memoriesUrlAPI}/api/admin/users`;

    constructor(private http:HttpClient) { }

    fetchRolesByUser(userId:Guid){
		return this.http.get<Envelop<Rol[]>>(`${this.urlApi}/${userId.toString()}/roles`);
	}

    addRolToUser(data:any,userId:Guid){
        return this.http.post<Envelop<boolean>>(`${this.urlApi}/${userId.toString()}/roles`,data);
    }
    removeRolFromUser(data:any,userId:Guid){
        const httpOpions={
            headers : new HttpHeaders({}),
            body:data
        };
        return this.http.delete<Envelop<boolean>>(`${this.urlApi}/${userId.toString()}/roles`,httpOpions);
    }
}
