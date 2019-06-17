import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientListChanged: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredientList();
    this.ingredientListChanged =  this.shoppingListService.onIngredientAdded
      .subscribe(
        (ingredientsList: Ingredient[]) => this.ingredients = ingredientsList
      );
  }

  ngOnDestroy() {
    this.ingredientListChanged.unsubscribe();
  }

}
