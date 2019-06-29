import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe-list/recipe-model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Account } from '../account/account/account.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private readonly dataURL = 'https://shopping-list-f962f.firebaseio.com/';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {   }

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

  getAccount() {
    return this.authService.user.pipe(exhaustMap ( userData => {
      if (!userData) {
        return new Observable<Account>(null);
      }
      return this.http.get<Account>(this.dataURL + userData.id + '/account.json');
    }));
  }

  setAccount(id: string, email: string) {
    const account = new Account (id, email);
    this.http.put(this.dataURL + account.id + '/account.json', account).pipe(take(1)).subscribe();
  }

  updateAccount(account: Account) {
    console.log(account);

    this.http.put(this.dataURL + account.id + '/account.json', account).pipe(take(1)).subscribe({
      next: data => console.log(data)
    });
  }

  postProfilePicture(image: File) {
    const storageRef = this.initStorage().ref();
    const ext = image.name.split('.')[image.name.split.length - 1];
    this.authService.user.pipe(take(1)).subscribe({
      next: data => {
        const fileRef = storageRef.child(data.id + '/pfp');
        fileRef.put(image).then(response => {
          console.log(response);
        });
      }
    });
  }

  getProfilePicture() {
  return this.authService.user.pipe(take(1), exhaustMap(
    data => {
       const storageRef = this.initStorage().ref('d9PgSz6Fj8NKo3OntXE6KdwewaH3/');
       return storageRef.child('pfp').getDownloadURL();
    }
  ));
  }

  initStorage() {
    if (firebase.apps.length === 0) {
      const firebaseRef = firebase.initializeApp({
        apiKey: 'AIzaSyAmyn4rYBMmDqyQg_uCPZgNod13ZkBvD9k',
        authDomain: 'shopping-list-f962f.firebaseapp.com',
        databaseURL: 'https://shopping-list-f962f.firebaseio.com',
        storageBucket: 'gs://shopping-list-f962f.appspot.com/'
      });
  }
    const storage = firebase.apps[0].storage();
    return storage;
  }
}
