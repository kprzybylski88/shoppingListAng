import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe-list/recipe-model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
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

  recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
