import { IRegisterCredential } from './../_interfaces/registerCredential';
import { Observable } from 'rxjs';
import { IToken } from './../_interfaces/token';
import { ICredential } from 'src/app/_interfaces/credential';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/auth/login';

  urlRegister = 'http://localhost:3000/auth/register';
  constructor(private http: HttpClient) {}

  login(credentials: ICredential): Observable<IToken> {
    return this.http.post<IToken>(this.url, credentials);
  }

  register(credentials: IRegisterCredential) {
    return this.http.post(this.urlRegister, credentials);
  }
}
