import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe-list/recipe-model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    private router: Router) { }

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
    this.shoppingListService.addEditIngredients(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
