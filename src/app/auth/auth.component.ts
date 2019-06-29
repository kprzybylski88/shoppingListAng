import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {
  private closeSub: Subscription;
  loginMode = true;
  errorMessage = '';
  loading = false;
  authObs: Observable<any>;

  constructor(private authService: AuthService, private router: Router, private cmpFtryRes: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authForm: NgForm) {
    this.loading = true;
    if (this.loginMode) {
      this.authObs = this.authService.login(authForm.value);
    } else {
      this.authObs = this.authService.signup(authForm.value);
    }
    this.authObs.subscribe({
      error: err => {
        console.log(err),
        this.errorMessage = err;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        console.log('success!');
        if (this.loginMode) {
          this.router.navigate(['/recipes']);
        }
      }
    });
  }

/*   private showErrorAlert(message: string) {
    const alertCmpFactory = this.cmpFtryRes.resolveComponentFactory(AlertComponent);
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.dismiss.subscribe(() => {
      componentRef.destroy();
      this.closeSub.unsubscribe();
    });
  } */

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
