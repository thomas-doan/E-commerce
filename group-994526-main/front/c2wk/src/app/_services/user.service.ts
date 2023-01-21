import { IApi } from './../_interfaces/api';
import { IUserAdress } from 'src/app/_interfaces/user-adress';
import { IUser } from 'src/app/_interfaces/user';
import { ISingleUserAdress } from './../_interfaces/user-adress';
import { Observable } from 'rxjs';
import { IDataUser, ISingleUser } from './../_interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/data_user';
  constructor(private http: HttpClient) {}

  endPointData_user() {
    return this.http.get(`${this.url} /user/`);
  }

  getAllUsers(): Observable<IDataUser> {
    return this.http.get<IDataUser>(`${this.url}/users`);
  }

  getUser(id: string | null): Observable<ISingleUser | ISingleUserAdress> {
    return this.http.get<ISingleUser | ISingleUserAdress>(
      `${this.url}/user/${id}`
    );
  }

  updateUser(user: IUser): Observable<IApi> {
    return this.http.patch<IApi>(this.url + '/user/' + user.id_user, user);
  }

  updateUserAdress(userAdress: IUserAdress): Observable<IApi> {
    return this.http.patch<IApi>(
      this.url + '/user_with_adress/' + userAdress.UserIdUser,
      userAdress
    );
  }

  deleteUser(id: number | undefined): Observable<IApi> {
    return this.http.delete<IApi>(this.url + '/user/' + id);
  }
}
