import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) slForm: NgForm;
  slSubscription: Subscription;
  editMode = false;
  index: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.slSubscription = this.shoppingListService.startedEditing.subscribe({
        next: (id: number) => {
          this.index = id;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredientById(id);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      });
  }

  addToList(form: NgForm) {
    const name = form.value.name;
    const amount = form.value.amount === '' ? 0 : +form.value.amount;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingListService.addEditIngredients([ingredient], this.index);
      this.slForm.reset();
      this.editMode = false;
    } else {
      this.shoppingListService.addEditIngredients([ingredient]);
    }
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    this.shoppingListService.deleteItemById(this.index);
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.slSubscription.unsubscribe();
  }

}
