import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe-list/recipe-model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private readonly dataURLs = {
    recipes: 'https://shopping-list-f962f.firebaseio.com/recipes.json',
    shoppingList: 'https://shopping-list-f962f.firebaseio.com/shopLis.json'
  };

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.recipes;
    this.http.put(this.dataURLs.recipes, recipes)
      .subscribe({
        next: response => console.log(response),
        error: err => console.log(err),
        complete: () => console.log('Upload: overwrite complete!')
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.dataURLs.recipes)
      .pipe(
        map( recipes => {
          return recipes.map(recipe => {
           return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => this.recipeService.recipes = recipes
      )
    );
  }

}
