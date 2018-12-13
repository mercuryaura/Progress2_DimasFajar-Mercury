import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class DataStorageService {
    constructor (private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://ng-recipe-book-b7323.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }
    getRecipes() {
        this.http.get('https://ng-recipe-book-b7323.firebaseio.com/recipes.json')
        .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                 this.recipeService.setRecipes(recipes);
            }
        );
    }
}