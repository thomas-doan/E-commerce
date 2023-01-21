import { Router } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';
import { IToken } from './../../_interfaces/token';
import { ICredential } from 'src/app/_interfaces/credential';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import {
  faUserEdit,
  faMailBulk,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  faUserEdit = faUserEdit;
  faMailBulk = faMailBulk;
  faLock = faLock;
  form: ICredential = {
    email: '',
    password: '',
  };
  constructor(
    private AuthService: AuthService,
    private TokenService: TokenService,
    private Router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.AuthService.login(this.form).subscribe(
      (res) => {
        this.TokenService.saveToken(res.access_token);
        this.Router.navigate(['admin']);
      },
      (err) => console.log(err)
    );
  }
}
