import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Observable } from 'rxjs';
import {
		HttpRequest,
		HttpHandler,
		HttpEvent,
		HttpInterceptor,
		HttpHeaders
		} from '@angular/common/http';

@Injectable()
export class TokenJwtInterceptor implements HttpInterceptor {

    constructor(private localStorageService:LocalStorageService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if(request.headers.get('Anonymous') !== undefined && request.headers.get('Anonymous')!==null){
			const newHeaders = request.headers.delete('Anonymous');
			const newReq = request.clone({headers:newHeaders});
			return next.handle(newReq);
		}
		else{
			let token = this.localStorageService.getTokenJwt();
			const authReq = request.clone({
				headers: new HttpHeaders({
				  'Content-Type':  'application/json',
				  'Authorization': 'Bearer '+ token})
			  });
			return next.handle(authReq);
		}

    }
}
