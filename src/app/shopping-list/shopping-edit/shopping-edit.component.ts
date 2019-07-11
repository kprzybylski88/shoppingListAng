import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) slForm: NgForm;
  // slSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.store.select('shoppingList').subscribe({
      next: stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    });
    // this.slSubscription = this.shoppingListService.startedEditing.subscribe({
    //     next: (id: number) => {
    //       this.index = id;
    //       this.editMode = true;
    //       this.editedItem = this.shoppingListService.getIngredientById(id);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       });
    //     }
    //   });
  }

  addToList(form: NgForm) {
    const name = form.value.name;
    const amount = form.value.amount === '' ? 0 : +form.value.amount;
    const newIngredient = new Ingredient(name, amount);
    if (this.editMode) {
      // this.shoppingListService.addEditIngredients([ingredient], this.index);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
      this.slForm.reset();
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addEditIngredients([ingredient]);
    }
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteItem() {
    // this.shoppingListService.deleteItemById(this.index);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    // this.slSubscription.unsubscribe();
  }

}
