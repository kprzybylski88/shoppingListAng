import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [  {path: '', component: AuthComponent}];

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {}
