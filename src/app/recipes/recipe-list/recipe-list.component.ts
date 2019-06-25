import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe-model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeSubscription: Subscription;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.fetchRecipes().subscribe({ error: err => console.log(err) });
    this.recipes = this.recipeService.recipes;
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe({
      next: (newRecipes) => this.recipes = newRecipes
    });
  }

  onClick(index: number) {
    console.log(index);

  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }


}
