import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private Router: Router) {}

  jwtService: JwtHelperService = new JwtHelperService();
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isConnected(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isAdmin() {
    const token: string | undefined =
      localStorage.getItem('token') ?? undefined;

    const userInfo = this.jwtService.decodeToken(token);

    if (userInfo.fk_role == 1) {
      return false;
    } else {
      return true;
    }
  }

  tokenDecrypted() {
    const token: string | undefined =
      localStorage.getItem('token') ?? undefined;

    const userInfo = this.jwtService.decodeToken(token);
    return userInfo;
  }

  removeToken(): void {
    localStorage.removeItem('token');
    this.Router.navigate(['/']);
  }

  removeTokenExpired(): void {
    localStorage.removeItem('token');
    this.Router.navigate(['auth']);
  }

  receiveToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(): any {
    const decodedToken = this.jwtService.decodeToken(
      this.receiveToken() ?? undefined
    );
    return decodedToken;
  }
}
