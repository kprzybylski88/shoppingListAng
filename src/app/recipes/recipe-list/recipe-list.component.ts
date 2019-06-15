import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe-model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe 1', 'This is a test', 'https://storage.needpix.com/rsynced_images/recipe-575434_1280.png'),
    new Recipe('A test recipe 2', 'This is a test', 'https://storage.needpix.com/rsynced_images/recipe-575434_1280.png')
  ];

  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }
  forwardSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }

}
