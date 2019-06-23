import { Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe-model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

 /*  private _recipes: Recipe[] = [
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
  ]; */

  private _recipes: Recipe[] = [];
  constructor() { }

  get recipes() {
    return this._recipes.slice();
  }

  set recipes(newRecipes: Recipe[]) {
    this._recipes = newRecipes;
    this.recipesChanged.next(this._recipes.slice());
  }

  getRecipeById(id: number) {
    return this._recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this._recipes.slice());
  }

  updateRecipe(recipe: Recipe, index: number) {
    this._recipes[index] = recipe;
    this.recipesChanged.next(this._recipes.slice());
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipesChanged.next(this._recipes.slice());

  }



}
