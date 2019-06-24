import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe-list/recipe-model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
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
    return this.authService.user.pipe(
      take(1),
      exhaustMap( user => {
        // exhaust map. It is confusing, but also kinda awesome.
        // You can merge two observables in one. You just need to return one of them inside the exhaust map
        // and then proceed like you got that one. Here we change user observable into http one.
        return this.http.get<Recipe[]>(this.dataURLs.recipes, {
          params: new HttpParams().set('auth', user.token)
          });
      }),
      map( recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
    tap(recipes => this.recipeService.recipes = recipes
  ));
  }

}
