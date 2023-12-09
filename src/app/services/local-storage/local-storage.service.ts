import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

	constructor() { }

	getTokenJwt():string | null {
		let jwt = localStorage.getItem('sessionToken');
		return jwt;
	}

	setSesionToken(sessionToken:string):void{
		localStorage.setItem('sessionToken',sessionToken);
	}

	setItem(name:string,value:any){
		localStorage.setItem(name,value);
	}

	getItem(name:string){
		return localStorage.getItem(name);
	}

    clearSession(){
        localStorage.clear();
    }
}
