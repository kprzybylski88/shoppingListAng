import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Recipe } from './recipe-list/recipe-model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {


  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

    let recipes: any = this.recipeService.recipes;
    if (recipes.length === 0) {
      recipes = this.dataStorageService.fetchRecipes()
        .pipe(tap(data => {
          console.log(data);

          if (!data[route.params.id]) {
            this.router.navigate(['/recipes']);
          }
        }
      ));
    } else {
      if (!recipes[route.params.id]) {
        this.router.navigate(['/recipes']);
      }
    }
    return recipes;
  }

}
