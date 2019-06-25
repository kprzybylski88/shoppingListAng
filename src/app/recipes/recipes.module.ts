import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { NoRecipeComponent } from './no-recipe/no-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalImagePreviewComponent } from '../modal-image-preview/modal-image-preview.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    NoRecipeComponent,
    RecipeEditComponent,
    ModalImagePreviewComponent,
  ],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    NoRecipeComponent,
    RecipeEditComponent
  ]
})
export class RecipesModule {

}
