import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import {  environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  userData: any;

  logOut(): void {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }

  saveUserData() {
    if (localStorage.getItem('etoken') != null) {
      let encodedToken: any = localStorage.getItem('etoken');
      let decodedToken = jwtDecode(encodedToken);
      this.userData = decodedToken;
      console.log(decodedToken);
    }
  }

  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      userData
    );
  }

  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      userData
    );
  }
}
