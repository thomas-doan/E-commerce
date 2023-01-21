import { IRegisterCredential } from './../../_interfaces/registerCredential';
import { Router } from '@angular/router';
import { AuthRoutingModule } from './../auth-routing.module';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import {
  faUserEdit,
  faMailBulk,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  faUserEdit = faUserEdit;
  faMailBulk = faMailBulk;
  faLock = faLock;

  form: IRegisterCredential = {
    password: '',
    email: '',
    username: '',
    fk_role: 1,
  };

  constructor(private AuthService: AuthService, private Router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.AuthService.register(this.form).subscribe((res: any) => {
      this.Router.navigate(['auth/login']);
    });
  }
}
