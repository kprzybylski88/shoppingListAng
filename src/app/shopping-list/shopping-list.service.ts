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
  startedEditing = new Subject<number>();

  addEditIngredients(newIngredients: Ingredient[], index?: number) {
    // if there is no index provided then it's adding ingredients.
    // If we can find the ingredient with the same name we group them together changing the amount accordingly
    for (const ingredient of newIngredients) {
      const item = this.ingredients.find(ingr => ingr.name === ingredient.name);
      if (item) {
        if (index || index === 0) {
          if (this.ingredients.indexOf(item) !== index) {
            item.amount += ingredient.amount;
            this.ingredients.splice(index, 1);
          } else {
            item.amount = ingredient.amount;
          }
        } else {
          item.amount += ingredient.amount;
        }
        console.log(index);
      } else {
        if (index) {
          this.ingredients[index] = ingredient;
        } else {
          this.ingredients.push(ingredient);
        }
      }
    }
    this.onIngredientAdded.next(this.ingredients.slice());
  }

  deleteItemById(id: number) {
    this.ingredients.splice(id, 1);
    this.onIngredientAdded.next(this.ingredients.slice());
  }

  getIngredientList() {
    return this.ingredients.slice();
  }

  getIngredientById(id: number) {
    return this.ingredients[id];
  }


/*   addIngredient(ingredient: Ingredient) {
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

  updateIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients[id] = newIngredient;
    this.onIngredientAdded.next(this.ingredients.slice());
  }
   */

  constructor() { }
}
