import { IUserAdress } from 'src/app/_interfaces/user-adress';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/_services/user.service';
import { IUser } from 'src/app/_interfaces/user';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-u-edit',
  templateUrl: './u-edit.component.html',
  styleUrls: ['./u-edit.component.scss'],
})
export class UEditComponent implements OnInit {
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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    let uid = this.activated.snapshot.paramMap.get('id');

    /* this.userService.getUser(uid) */

    this.http
      .get('http://localhost:3000/data_user/user/' + uid)
      .subscribe((res_of_user: any) => {
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
      this.userService
        .updateUser(this.user)
        .subscribe((data: any) => console.log(data.message));
    }
  }
}
