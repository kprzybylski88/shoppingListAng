import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe-list/recipe-model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private readonly dataURL = 'https://shopping-list-f962f.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {   }

  storeRecipes() {
    console.log('bop');
    this.authService.user
    .pipe(take(1), tap( user => {
      console.log('boop');
      const recipes = this.recipeService.recipes;
      this.http.put(this.dataURL + user.id + '/recipes.json', recipes)
      .subscribe({
        next: response => console.log(response),
        error: err => console.log(err),
        complete: () => console.log('Upload: overwrite complete!')
      });
    })).subscribe();
  }

  fetchRecipes() {
    return this.authService.user.pipe(take(1), exhaustMap( user => {
      return this.http.get<Recipe[]>(this.dataURL + user.id + '/recipes.json')
      .pipe(
        map( recipes => {
          return recipes.map(recipe => {
           return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => this.recipeService.recipes = recipes)
    );
    } ));

  }

}
