import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ModalImagePreviewComponent } from './modal-image-preview/modal-image-preview.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      ModalImagePreviewComponent
   ],
   imports: [
      AuthModule,
      ShoppingListModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule,
      CoreModule
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
