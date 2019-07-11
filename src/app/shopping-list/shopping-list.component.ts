import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredientListChanged: Subscription;
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients.subscribe(data => console.log(data.ingredients));
    // this.ingredients = this.shoppingListService.getIngredientList();
    // this.ingredientListChanged =  this.shoppingListService.onIngredientAdded
    //   .subscribe(
    //     (ingredientsList: Ingredient[]) => this.ingredients = ingredientsList
    //   );
  }

  onEditItem(id: number) {
    // this.shoppingListService.startedEditing.next(id);
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }

  ngOnDestroy() {
    // this.ingredientListChanged.unsubscribe();
  }

}
