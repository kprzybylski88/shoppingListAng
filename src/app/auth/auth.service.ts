import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';

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
  setAccount = new BehaviorSubject<{id: string, email: string}>(null);
  private readonly appKey = 'AIzaSyAmyn4rYBMmDqyQg_uCPZgNod13ZkBvD9k';
  private readonly URLs = {
    signupURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=',
    loginURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
  };


  logoutTimeout: any;


  constructor(
    private http: HttpClient,
    private router: Router,
    private recipeService: RecipeService) { }

  signup(signupData: {email: string, password: string}): Observable<any> {
    return this.http.post<AuthResponseData>(this.URLs.signupURL + this.appKey,
    {
      email: signupData.email,
      password: signupData.password,
      returnSecureToken: true
    }).pipe(catchError( err => this.handleError(err)), tap(resData => {
      this.handleAuthentication(resData);
      this.setAccount.next({id: resData.localId, email: resData.email});
      this.router.navigate(['/account']);
    }));
  }

  login(loginData: {email: string, password: string}) {
    return this.http.post<AuthResponseData>(this.URLs.loginURL + this.appKey,
      {
        email: loginData.email,
        password: loginData.password,
        returnSecureToken: true
      }).pipe(catchError( err => this.handleError(err)), tap(resData => this.handleAuthentication(resData)));
  }

  logout(/* calledFrom: string */) {
    // console.log(calledFrom);
    this.recipeService.recipes = [];
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);

    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
    }
  }

  autologout(expirationTime: number) {
    this.logoutTimeout = setTimeout( () => { this.logout(); }, expirationTime);
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
    this.autologout(+authData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autologout(expirationDate.getTime() - new Date().getTime());
  }

  autologin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.user.next(loadedUser);

      const expTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autologout(expTime);

    }
  }
}
