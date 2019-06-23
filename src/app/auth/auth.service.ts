import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly appKey = 'AIzaSyAmyn4rYBMmDqyQg_uCPZgNod13ZkBvD9k';
  private readonly URLs = {
    signupURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='
  };

constructor(private http: HttpClient) { }
  signup(signupData: {email: string, password: string}) {
    return this.http.post<AuthResponseData>(this.URLs.signupURL + this.appKey,
    {
      email: signupData.email,
      password: signupData.password,
      returnSecureToken: true
    });
  }
}
