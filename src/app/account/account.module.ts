import { NgModule } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core.module';
import { AuthGuardService } from '../auth/auth.guard.service';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
