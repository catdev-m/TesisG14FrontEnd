import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Envelop } from 'src/app/interfaces/shared/envelop';
import { Permission } from 'src/app/interfaces/administration/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
    private urlApi:string=`${environment.memoriesUrlAPI}/api/admin/roles`;
    private urlApiV1:string=`${environment.memoriesUrlAPI}/api/admin/permissions`;
      constructor(private http:HttpClient) { }

    fetchAll(){
        return this.http.get<Envelop<Permission[]>>(`${this.urlApiV1}`);
    }

    searchPermissionOfRol(rolId:string){
        return this.http.get<Envelop<Permission[]>>(`${this.urlApi}/${rolId}/permissions`);
    }

    deletePermissionFromRol(data:any){
        const httpOpions={
            headers : new HttpHeaders({}),
            body:data
        };
        return this.http.delete<Envelop<boolean>>(`${this.urlApi}/${data.rolCode}/permissions`,httpOpions);
    }

    addPermissionToRol(data:any){
        return this.http.post<Envelop<boolean>>(`${this.urlApi}/${data.rolCode}/permissions`,data);
    }



}
