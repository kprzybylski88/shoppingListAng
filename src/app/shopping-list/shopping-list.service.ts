import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient [] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatos', 10)
  ];

  onIngredientAdded = new Subject<Ingredient[]>();

  getIngredientList() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    const item = this.ingredients.find(ingr => ingr.name === ingredient.name);

    if (item) {
      const index = this.ingredients.indexOf(item);
      this.ingredients[index].amount = this.ingredients[index].amount + ingredient.amount;
       } else {
         this.ingredients.push(ingredient);
    }
    this.onIngredientAdded.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    for (const ingredientItem of newIngredients) {
       const item = this.ingredients.find(ingr => ingr.name === ingredientItem.name);
       if (item) {
         const index = this.ingredients.indexOf(item);
         this.ingredients[index].amount = this.ingredients[index].amount + ingredientItem.amount;
       } else {
         this.ingredients.push(ingredientItem);
       }
    }

    this.onIngredientAdded.next(this.ingredients.slice());
  }

  constructor() { }
}
