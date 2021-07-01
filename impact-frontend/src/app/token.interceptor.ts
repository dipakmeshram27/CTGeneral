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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("TokenInterceptor");
    console.log("Request method: " +request.method);
    console.log("Request URL: " +request.url);
    
    if(request.method == "GET")
    {
      let clonedrequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.loginService.AuthenticationToken}`
        }
      });
      return next.handle(clonedrequest).pipe(
        tap(event => console.log(`TOKEN RESPONSE: ${JSON.stringify(event)}`))
      );
    }
    return next.handle(request).pipe(
      tap(event => console.log(`TOKEN RESPONSE: ${JSON.stringify(event)}`))
    );
  }
}
