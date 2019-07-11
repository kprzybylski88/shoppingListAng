import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe-list/recipe-model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  imagePreview = false;
  recipe: Recipe;
  routeSubscription: Subscription;
  index: number;
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ingredients: fromShoppingList.AppState}>) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipeById(+this.route.snapshot.params.id);

    this.routeSubscription = this.route.params.subscribe({
      next: (params) => {
        this.index = parseInt(params.id, 10);
        this.recipe = this.recipeService.getRecipeById(this.index);
      }}
    );
  }

  addIngredients() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
