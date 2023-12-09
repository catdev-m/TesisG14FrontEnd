
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Envelop } from 'src/app/interfaces/shared/envelop';
import { Faculty } from 'src/app/interfaces/organization/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultiesService {

    private urlApi:string=`${environment.memoriesUrlAPI}/api/org/faculties`;

  constructor(
            private http:HttpClient
    )
    { }

    fetchAll(){
        return this.http.get<Envelop<Faculty[]>>(`${this.urlApi}`);
    }

    create(faculty:Faculty){
       return this.http.post<Envelop<Faculty>>(`${this.urlApi}`,faculty);
    }

    update(faculty:Faculty){
        return this.http.post<Envelop<Faculty>>(`${this.urlApi}/${faculty.facultyId.toString()}`,faculty);
     }
}
