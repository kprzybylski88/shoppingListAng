import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MDCFloatingLabel} from '@material/floating-label';
import {MDCTextField} from '@material/textfield';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userForm: FormGroup;
  constructor() { }

  ngOnInit() {
    const floatingLabel = new MDCFloatingLabel(document.querySelector('.mdc-floating-label'));
    const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
  }

  updateUser() {

  }

}
