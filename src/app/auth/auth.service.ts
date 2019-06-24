import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    }).pipe(catchError( err => {
      console.log(err);

      if (!err.error || !err.error.error) {
        return err;
      }

      let errorMessage = err.error.error.message;

      switch (err.error.error.message) {
        case 'EMAIL_EXISTS': errorMessage = 'User with this email address already exists!'; break;
        case 'WEAK_PASSWORD : Password should be at least 6 characters': {
           errorMessage = 'Password must be at least 6 characters!';
           break;
        }
        case 'MISSING_PASSWORD': errorMessage = 'Password must be at least 6 characters!'; break;
        case 'INVALID_EMAIL': errorMessage = 'This email address is invalid!'; break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER' : {
          errorMessage = 'We have discovered an unusual activity originating from your device. Please try again later.';
          break;
        }
      }
      return throwError(errorMessage);
    }));
  }
}
