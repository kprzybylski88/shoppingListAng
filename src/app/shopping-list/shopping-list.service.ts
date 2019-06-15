import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient [] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatos', 10)
  ];

  onIngredientAdded = new EventEmitter<Ingredient>();

  getIngredientList() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientAdded.emit(ingredient);
  }

  constructor() { }
}
