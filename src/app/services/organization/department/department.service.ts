import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Envelop } from 'src/app/interfaces/shared/envelop';
import { Department } from 'src/app/interfaces/organization/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    private urlApi:string=`${environment.memoriesUrlAPI}/api/org/dapartments`;
    constructor( private http:HttpClient) { }

    fetchAll(facultyId:string){
        return this.http.get<Envelop<Department[]>>(`${this.urlApi}?facultyId=${facultyId}`);
    }

    create(department:Department){
       return this.http.post<Envelop<Department>>(`${this.urlApi}`,department);
    }

    update(dep:Department){
        return this.http.post<Envelop<Department>>(`${this.urlApi}/${dep.departmentId.toString()}`,dep);
     }
}
