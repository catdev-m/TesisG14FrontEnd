import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Envelop } from 'src/app/interfaces/shared/envelop';
import { Menu } from 'src/app/interfaces/administration/menu';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private urlApi:string=`${environment.memoriesUrlAPI}/api/admin/menus`;

  constructor(private http:HttpClient) { }

  fetchAll(){
		return this.http.get<Envelop<Menu[]>>(`${this.urlApi}`);
	}

}
