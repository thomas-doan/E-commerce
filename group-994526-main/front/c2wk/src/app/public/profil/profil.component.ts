import { UserAdressService } from './../../_services/user-adress.service';
import { IAdressCredenial } from './../../_interfaces/credential';
import { IUserAdress } from 'src/app/_interfaces/user-adress';
import { IUser } from 'src/app/_interfaces/user';
import { TokenService } from 'src/app/_services/token.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  form: IAdressCredenial = {
    pays: '',
    ville: '',
    adresse_of_user: 0,
    cp: 0,
  };

  user: IUser = {
    id_user: 0,
    username: '',
    email: '',
    fk_role: 0,
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    password: '',
  };

  userWithAdress: IUserAdress = {
    User: {
      username: '',
      email: '',
      fk_role: 0,
      password: '',
    },
    UserIdUser: 0,
    id: 0,
    adresse_of_user: '',
    cp: 0,
    ville: '',
    pays: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  };

  checkIfUserHasAdress = {
    answer: '',
  };

  constructor(
    private activated: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient,
    private Router: Router,
    private TokenService: TokenService,
    private UserAdressService: UserAdressService
  ) {}

  ngOnInit(): void {
    let userInfo = this.TokenService.tokenDecrypted();

    this.http
      .get('http://localhost:3000/data_user/user/' + userInfo.id_user)
      .subscribe((res_of_user: any) => {
        console.log(res_of_user);
        if (typeof res_of_user.data.username !== 'undefined') {
          this.user = res_of_user.data;
          this.checkIfUserHasAdress.answer = 'no';
        } else {
          this.userWithAdress = res_of_user.data;
          this.checkIfUserHasAdress.answer = 'yes';
        }
      });
  }

  onSubmit(): void {
    if (this.checkIfUserHasAdress.answer === 'yes') {
      this.userService
        .updateUserAdress(this.userWithAdress)
        .subscribe((data: any) => console.log(data.message));
    }
    if (this.checkIfUserHasAdress.answer === 'no') {
      let userInfo = this.TokenService.tokenDecrypted();
      console.log(this.user);

      this.userService
        .updateUser(this.user)
        .subscribe((data: any) => console.log(data.message));

      if (
        this.form.pays !== '' &&
        this.form.ville !== '' &&
        this.form.adresse_of_user !== 0 &&
        this.form.cp !== 0
      ) {
        this.UserAdressService.createUserAdress(
          userInfo.id_user,
          this.form
        ).subscribe((data: any) => {
          console.log(data.message);
          window.location.reload();
        });
      } else {
        window.location.reload();
      }
    }
  }

  onDeleteUser(id_user: number | undefined): void {
    this.userService.deleteUser(id_user).subscribe((data: any) => {
      this.TokenService.removeToken();
      this.Router.navigate(['/']);
      console.log(data.message);
    });
  }
}
