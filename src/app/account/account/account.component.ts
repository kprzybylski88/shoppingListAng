import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Account } from './account.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  account: Account;
  userForm: FormGroup;
  imageSrc: string;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.initAccount();
    this.authService.setAccount.subscribe({
      next: data => {
        if (data) {
          this.dataStorageService.setAccount(data.id, data.email);
          this.account = new Account (data.id, data.email);
          this.patchAccount();
        }
      }
    }
    );
    this.dataStorageService.getAccount().subscribe({
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
    this.userForm.value.username = this.account.displayedName;
    this.userForm.value.email = this.account.email;
  }

  initAccount(accountData?: Account) {
    this.userForm = new FormGroup(
      {
        username: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        rePassword: new FormControl(),
        profilePicture: new FormControl()
      });
    // this.imageSrc = accountData.profilePicture === '' ? null : accountData.profilePicture;
  }

  fileUploadClick(event: Event) {
    const uploadInput = (event.target as HTMLElement).querySelector('input');
    if (uploadInput) {
      uploadInput.click();
    }
  }

  processFile(event: Event) {
 /*    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    } */
  }

  updateUser() {
/*     const username = this.userForm.value.username;
    const email = this.userForm.value.email;
    const profilePicture = '';
    this.dataStorageService.setAccount(username, email, profilePicture); */
  }

  ngOnDestroy() {

  }

}
