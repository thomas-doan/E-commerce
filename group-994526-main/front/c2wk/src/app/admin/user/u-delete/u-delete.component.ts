import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/_interfaces/user';
import { UserService } from 'src/app/_services/user.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-u-delete',
  templateUrl: './u-delete.component.html',
  styleUrls: ['./u-delete.component.scss'],
})
export class UDeleteComponent implements OnInit {
  userList: IUser[] = [];
  constructor(
    private userService: UserService,
    private Router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((resAllUsers) => {
      this.userList = resAllUsers.data;
    });
  }

  onDeleteUser(id_user: number | undefined): void {
    this.userService.deleteUser(id_user).subscribe((data: any) => {
      window.location.reload();
      console.log(data.message);
    });
  }
}
