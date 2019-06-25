import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module';


@NgModule({
   declarations: [
      AlertComponent,
      AuthComponent,
      AppComponent,
      HeaderComponent,
      ShoppingListComponent,
      ShoppingEditComponent,
      DropdownDirective

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      RecipesModule
   ],
   bootstrap: [
      AppComponent
   ],
   providers: [
     {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
   ]
})
export class AppModule { }
