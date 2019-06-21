import { Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe-model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [
    new Recipe(
      'Schnitzel',
      'This is a test',
      [
        new Ingredient('meat', 1),
        new Ingredient('fries', 20)
      ],
      'https://storage.needpix.com/rsynced_images/recipe-575434_1280.png'),
    new Recipe(
      'burger',
      'This is a test',
      [
        new Ingredient('buns', 2),
        new Ingredient('patty', 1)
      ],
      'https://storage.needpix.com/rsynced_images/recipe-575434_1280.png')
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe, index: number) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
    console.log(this.recipes);

  }

}
