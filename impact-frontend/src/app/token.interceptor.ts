import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './service/login/login-service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    
    

    const user = this.loginService.userValue;
    const isLoggedIn = user;
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    if (isLoggedIn || isApiUrl) {
        let clonedrequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.loginService.AuthenticationToken}`
            }
        });
        return next.handle(clonedrequest).pipe(
          tap(event => `TOKEN RESPONSE: ${JSON.stringify(event)}`));
    }
    
 
    }
}
