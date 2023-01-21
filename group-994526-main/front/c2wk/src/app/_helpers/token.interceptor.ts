import { TokenService } from 'src/app/_services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private TokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.TokenService.receiveToken();
    if (token !== null) {
      let clone = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(clone).pipe(
        catchError((err) => {
          console.log(err);
          if (err.status === 401) {
            this.TokenService.removeTokenExpired();
          }
          return throwError(err);
        })
      );
    }

    return next.handle(request);
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
