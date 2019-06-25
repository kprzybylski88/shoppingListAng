import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
<<<<<<< HEAD
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
=======
import { ModalImagePreviewComponent } from './modal-image-preview/modal-image-preview.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
>>>>>>> 36b3ab5ca02ac16f027672d3818a023069bf60c8

@NgModule({
   declarations: [
      AuthComponent,
      AppComponent,
      HeaderComponent,
<<<<<<< HEAD
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
=======
      ModalImagePreviewComponent
>>>>>>> 36b3ab5ca02ac16f027672d3818a023069bf60c8
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
