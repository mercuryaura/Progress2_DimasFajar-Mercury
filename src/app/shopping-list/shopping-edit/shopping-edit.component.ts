import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm:NgForm;
subscription:Subscription;
editMode= false;
editedItemIndex:number;
editedItem:Ingredient;
  //ViewChild dekorator digunakan untuk mendapatkan akses ke komponen anak,
  //yang ditemukan di template, sehingga Anda dapat mengakses properti dan metodenya
  //@Output() ingredientAdded= new EventEmitter<Ingredient>();
  constructor(private slsService:ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.slsService.startedEditing
    .subscribe(
      (index: number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.slsService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
onSubmit(form: NgForm){
  const value =form.value;
  const newIngredient= new Ingredient(value.name,value.amount);
  if(this.editMode){
    this.slsService.updateIngredient(this.editedItemIndex, newIngredient);
  }else{
    this.slsService.addIngredient(newIngredient);
  }
  this.editMode= false;
  form.reset();
  //this.ingredientAdded.emit(newIngredient);
  //console.log(this.ingredientAdded);
}
onClear(){
  this.slForm.reset();
  this.editMode=false;

}
onDelete(){
  this.slsService.deleteIngredient(this.editedItemIndex);
this.onClear();
}
ngOnDestroy(){
this.subscription.unsubscribe();
}
}