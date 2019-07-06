import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AccountModule } from './account/account.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent

   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      SharedModule,
      CoreModule,
      AccountModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatInputModule,
      StoreModule.forRoot(reducers, { metaReducers })
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
