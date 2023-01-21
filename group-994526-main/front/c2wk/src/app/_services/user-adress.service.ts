import { IAdressCredenial } from './../_interfaces/credential';
import { IDataAdress } from './../_interfaces/adress';
import { ISingleUserAdress } from './../_interfaces/user-adress';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAdressService {
  url = 'http://localhost:3000/user_adress/me';

  createUserAdressUrl = 'http://localhost:3000/user_adress/';

  constructor(private http: HttpClient) {}

  getUserAdress(id: string | null): Observable<ISingleUserAdress> {
    return this.http.get<ISingleUserAdress>(`${this.url}`);
  }

  createUserAdress(id: string | null, credentials: IAdressCredenial) {
    return this.http.put<IDataAdress>(
      `${this.createUserAdressUrl}/${id}`,
      credentials
    );
  }
}
