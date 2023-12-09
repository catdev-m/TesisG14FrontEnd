import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Envelop } from 'src/app/interfaces/shared/envelop';
import { Rol } from 'src/app/interfaces/administration/rol';
import { Menu } from 'src/app/interfaces/administration/menu';


@Injectable({
	providedIn: 'root'
})

export class RolService {
	private urlApi:string=`${environment.memoriesUrlAPI}/api/admin/roles`;
	constructor(private http:HttpClient) { }

	fetchRoles(){
		return this.http.get<Envelop<Rol[]>>(`${this.urlApi}`);
	}

	createRol(rolData : Rol){
		return this.http.post<Envelop<Rol>>(`${this.urlApi}`,rolData);
	}

	updateRol(rolData : Rol){
		return this.http.post<Envelop<Rol>>(`${this.urlApi}/${rolData.rolId}`,rolData);
	}

	fetchMenusByRol(rolCode:string){
		return this.http.get<Envelop<Menu[]>>(`${this.urlApi}/${rolCode}/menus`);
	}

	deleteMenuForRol(data:any){
		const httpOpions={
			headers : new HttpHeaders({}),
			body:data
		};
		return this.http.delete<Envelop<boolean>>(`${this.urlApi}/${data.rolCode}/menus`,httpOpions);
	}

	addMenuForRol(data:any){
		return this.http.post<Envelop<boolean>>(`${this.urlApi}/${data.rolCode}/menus`,data);
	}
}
