import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent

   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      ShoppingListModule,
      SharedModule,
      CoreModule,
      AppRoutingModule

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
