import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BreadCrumbService {
	private breadcrumbItems = new BehaviorSubject<MenuItem[]> ([{label:'Memories',disabled:true}]);
	public breadCrumbList$ =this.breadcrumbItems.asObservable();

	constructor() { 
	}

	public getBreadCrumbList():Observable<MenuItem[]>{
		return this.breadcrumbItems;
	}

	public setViewBreadCrumb(breadCrumbs:MenuItem[] ){		
		this.breadcrumbItems.next(breadCrumbs);
	}

}
