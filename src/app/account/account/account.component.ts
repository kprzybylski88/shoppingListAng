import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from './account.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  account: Account;
  userForm: FormGroup;
  imageSrc: string;
  passwd: string;
  accSub: Subscription;
  pfpSub: Subscription;
  iniSub: Subscription;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.pfpSub = this.dataStorageService.getProfilePicture().subscribe({
      next: url => this.imageSrc = url,
      error: err => console.log(err)
    });
    this.initAccount();
    this.iniSub = this.authService.setAccount.subscribe({
      next: data => {
        if (data) {
          this.dataStorageService.setAccount(data.id, data.email);
          this.account = new Account (data.id, data.email);
          this.patchAccount();
        }
      }
    }
    );
    this.accSub = this.dataStorageService.getAccount().subscribe({
      next: accountData => {
        if (accountData) {
          this.account = accountData;
          this.patchAccount();
          console.log(accountData);
        }
      }
    });

  }

  patchAccount() {
    this.userForm.controls.username.setValue(this.account.displayedName);
    this.userForm.controls.email.setValue(this.account.email);
  }

  initAccount(accountData?: Account) {
    this.userForm = new FormGroup(
      {
        username: new FormControl(),
        email: new FormControl(null, [ Validators.required, Validators.email]),
        password: new FormControl(null, [this.passwordLengthValidator.bind(this)]),
        rePassword: new FormControl(),
        profilePicture: new FormControl()
      }, [this.passwordValidator.bind(this)] );
    // this.imageSrc = accountData.profilePicture === '' ? null : accountData.profilePicture;
  }

  fileUploadClick(event: Event) {
    const uploadInput = (event.target as HTMLElement).querySelector('input');
    if (uploadInput) {
      uploadInput.click();
    }
  }

  processFile(event: Event) {
    const input: HTMLInputElement = (event.target as HTMLInputElement);
    console.log(input.files[0]);

    if (input.files && input.files[0]) {
      this.dataStorageService.postProfilePicture(input.files[0]);
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = (reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  updateUser() {
/*     const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const profilePicture = '';
    this.dataStorageService.setAccount(username, email, profilePicture); */
    console.log(this.userForm.value);

    this.account = {
      id: this.account.id,
      email: this.userForm.value.email,
      displayedName: this.userForm.value.username
    };
    this.dataStorageService.updateAccount(this.account);
  }

  passwordValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value.password !== control.value.rePassword) {
      return {nope: true};
    }
    return null;
  }

  passwordLengthValidator(control: FormControl): {[s: string]: boolean} {
     /* console.log(control.value ? control.value : 'null'); */
     if (control.value && control.value.length > 0 && control.value.length < 6) {
      return {yup: true};
    }
     return null;
  }

  ngOnDestroy() {
    this.accSub.unsubscribe();
    this.iniSub.unsubscribe();
    this.pfpSub.unsubscribe();
  }

}
