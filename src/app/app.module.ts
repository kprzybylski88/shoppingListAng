import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AuthComponent } from './auth/auth.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
   declarations: [
      AuthComponent,
      AppComponent,
      HeaderComponent

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      RecipesModule,
      ShoppingListModule,
      SharedModule
   ],
   bootstrap: [
      AppComponent
   ],
   providers: [
     {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
   ]
})
export class AppModule { }
