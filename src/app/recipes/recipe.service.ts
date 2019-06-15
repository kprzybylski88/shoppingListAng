import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe-list/recipe-model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe('A test recipe 1', 'This is a test', 'https://storage.needpix.com/rsynced_images/recipe-575434_1280.png'),
    new Recipe('A test recipe 2', 'This is a test', 'https://storage.needpix.com/rsynced_images/recipe-575434_1280.png')
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
