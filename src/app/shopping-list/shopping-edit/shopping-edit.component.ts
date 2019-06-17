import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  addToList() {
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value === '' ? 0 : parseInt(this.amountInput.nativeElement.value, 10);

    if (name !== '' && amount !== 0) {
      const ingredient = new Ingredient(name, amount);
      this.shoppingListService.addIngredient(ingredient);
    }
  }

}
