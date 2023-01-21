import { IUser } from 'src/app/_interfaces/user';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-u-index',
  templateUrl: './u-index.component.html',
  styleUrls: ['./u-index.component.scss'],
})
export class UIndexComponent implements OnInit {
  userList: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((resAllUsers) => {
      this.userList = resAllUsers.data;
    });
  }
}
