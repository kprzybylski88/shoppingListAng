import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ModalImagePreviewComponent } from './modal-image-preview/modal-image-preview.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { NoRecipeComponent } from './recipes/no-recipe/no-recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './shared/alert/alert.component';


@NgModule({
   declarations: [
      AlertComponent,
      AuthComponent,
      AppComponent,
      HeaderComponent,
      RecipesComponent,
      RecipeListComponent,
      RecipeDetailComponent,
      RecipeItemComponent,
      ShoppingListComponent,
      ShoppingEditComponent,
      ModalImagePreviewComponent,
      DropdownDirective,
      NoRecipeComponent,
      RecipeEditComponent

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   bootstrap: [
      AppComponent
   ],
   providers: [
     {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
   ]
})
export class AppModule { }
