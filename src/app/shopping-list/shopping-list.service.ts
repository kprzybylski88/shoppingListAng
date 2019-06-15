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

  onIngredientAdded = new EventEmitter<Ingredient[]>();

  getIngredientList() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    let item = this.ingredients.find(ingr => ingr.name === ingredient.name);

    if (item) {
      let index = this.ingredients.indexOf(item);
      this.ingredients[index].amount = this.ingredients[index].amount + ingredient.amount;
       } else {
         this.ingredients.push(ingredient);
    }
    this.onIngredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    for (const ingredientItem of newIngredients) {
       let item = this.ingredients.find(ingr => ingr.name === ingredientItem.name);
       if(item) {
         let index = this.ingredients.indexOf(item);
         this.ingredients[index].amount = this.ingredients[index].amount + ingredientItem.amount;
       } else {
         this.ingredients.push(ingredientItem);
       }
    }

    this.onIngredientAdded.emit(this.ingredients.slice());
  }

  constructor() { }
}
