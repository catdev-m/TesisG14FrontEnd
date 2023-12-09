import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
	constructor(private router:Router,private localStorageService:LocalStorageService){}

  	canActivate(
		route: ActivatedRouteSnapshot,
    	state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		
			let token = this.localStorageService.getTokenJwt();
			if(token == null || token==null){
				this.router.navigate(['auth/login'],{});
			}
		
    return true;
  }
  
}
