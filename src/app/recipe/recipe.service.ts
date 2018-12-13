import { Injectable } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
@Injectable(

)
export class RecipeService {
recipesChanged=new Subject<Recipe[]>();


  //property:class recipe

  private recipes:Recipe[]=[
    new Recipe('Family Package','Sesi foto 2 jam, 25x shoot, 1 lokasi, ukuran print 5x7, eksklusif album foto',
  'https://cdn.idntimes.com/content-images/post/20180330/rachelvenya-34fc61b78f4d877d31eba83b5d3c77aa.jpg',
  [
  ]),
  new Recipe('Wedding Package','Sesi foto 9 jam, unlimited shoot, 1 lokasi, ukuran print 5x7, eksklusif album','https://www.wowkeren.com/display/images/photo/2018/09/21/00224958.jpg',
[
]),  
new Recipe('Prewedding Package','Sesi foto 3 jam, 20 shoot, max 4 lokasi, ukuran max 10x8.','https://cdn0-production-images-kly.akamaized.net/wo_m3teg5Cdp6PKi_ILCztId4xk=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1835198/original/072061000_1516181691-1702731.jpg',
[
]),  
new Recipe('Graduation Package','Sesi foto 3 jam, 100 shoot, 1 lokasi','https://whiteroomstudio.com.sg/phpthumb/phpThumb.php?src=%2Fimages%2FWRSP%2Fgalleryphotos%2F106%2FCaline_28.jpg',
[
]),
new Recipe('Year Book Package','Sesi foto 2 minggu per 3 jam, 10 shoot, 3 lokasi','http://fullwarna.com/wp-content/uploads/2018/02/Buku-Tahunan-Populer-Anak-Sekolah.jpg',
[
]),
new Recipe('Personal Photo Package','Sesi foto 2 jam, 10 shoot, 1 lokasi, ukuran max 10x8','https://i.pinimg.com/originals/06/9f/e5/069fe55f2126f421aa6a342c810eff6f.jpg',
[
]),
new Recipe('Baby Photo Package','Sesi foto 4 jam, 10 shoot, 1 lokasi, ukuran 5x7','https://cdn.idntimes.com/content-images/post/20180112/8-3d4895ef19bd58e5c85167ea85bae4fb_600x400.jpg',
[
]),
];

  getRecipes(){
    return this.recipes.slice();
  }
  //tambahkan method addIngredientsShoppingList dengan parameter ingredient[]
  addIngredientsShoppingList(ingredients: Ingredient[]){
    this.slsService.addIngredients(ingredients);
  }
  getRecipe(index:number){
    return this.recipes [index] ;
  }
  //tambahkan parameter pada construktor
constructor(private slsService: ShoppingListService) { 
}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

addRecipe(recipe: Recipe){
this.recipes.push(recipe);
this.recipesChanged.next(this.recipes.slice());
}
updateRecipe(index: number, newRecipe: Recipe){
this .recipes[index]= newRecipe;
this.recipesChanged.next(this.recipes.slice());
}
deleteRecipe(index: number){
  this.recipes.splice(index, 1);
  this.recipesChanged.next(this.recipes.slice());
}
}