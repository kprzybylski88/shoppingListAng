import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private readonly appKey = 'AIzaSyAmyn4rYBMmDqyQg_uCPZgNod13ZkBvD9k';
  private readonly URLs = {
    signupURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=',
    loginURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
  };

  constructor(private http: HttpClient) { }

  signup(signupData: {email: string, password: string}): Observable<any> {
    return this.http.post<AuthResponseData>(this.URLs.signupURL + this.appKey,
    {
      email: signupData.email,
      password: signupData.password,
      returnSecureToken: true
    }).pipe(catchError( err => this.handleError(err)), tap(resData => this.handleAuthentication(resData)));
  }

  login(loginData: {email: string, password: string}) {
    return this.http.post<AuthResponseData>(this.URLs.loginURL + this.appKey,
      {
        email: loginData.email,
        password: loginData.password,
        returnSecureToken: true
      }).pipe(catchError( err => this.handleError(err)), tap(resData => this.handleAuthentication(resData)));

  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string;
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND': errorMessage = 'No account found. Check if you entered your email correctly or sign up!'; break;
      case 'INVALID_PASSWORD': errorMessage = 'Invalid password. Please check your password and try again!'; break;
      case 'USER_DISABLED': errorMessage = 'The user account has been disabled by an administrator.'; break;
      case 'EMAIL_EXISTS': errorMessage = 'User with this email address already exists!'; break;
      case 'WEAK_PASSWORD : Password should be at least 6 characters!': {
        errorMessage = 'Password must be at least 6 characters!';
        break;
      }
      case 'MISSING_PASSWORD': errorMessage = 'Password must be at least 6 characters!'; break;
      case 'INVALID_EMAIL': errorMessage = 'This email address is invalid!'; break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER' : {
        errorMessage = 'We have discovered an unusual activity originating from your device. Please try again later.';
        break;
      }
      default: errorMessage = errorRes.error.error.message;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(authData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + parseInt(authData.expiresIn, 10) * 1000);
    const user = new User(authData.email, authData.localId, authData.idToken, expirationDate);
    this.user.next(user);

  }
}
