import { Router } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pheader',
  templateUrl: './pheader.component.html',
  styleUrls: ['./pheader.component.scss'],
})
export class PheaderComponent {
  constructor(private TokenService: TokenService, private Router: Router) {}
  ngOnInit(): void {}

  checkIfUserHasAdress = {
    answer: 'yes',
  };
  CheckisAdmin() {
    return this.TokenService.isAdmin();
  }

  CheckisConnected() {
    return this.TokenService.isConnected();
  }

  logout(): void {
    this.TokenService.removeToken();
    window.location.reload();
  }

  redirectionToLogin(): void {
    this.Router.navigate(['auth/login']);
  }

  redirectionToRegister(): void {
    this.Router.navigate(['auth/register']);
  }
}
