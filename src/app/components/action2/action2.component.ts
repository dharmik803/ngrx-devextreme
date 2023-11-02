import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { InitialState } from '@ngrx/store/src/models';
import { Observable, find, of } from 'rxjs';
import { Foods } from 'src/app/models/fooditem.model';
import { MasterService } from 'src/app/services/master.service';
import { addFood, deleteFood, editFood, editFoodSuccess, loadFood } from 'src/app/store/ngrx.action';
import { getFoodList } from 'src/app/store/ngrx.selector';
import { AppState } from 'src/app/store/ngrx.state';

@Component({
  selector: 'app-action2',
  templateUrl: './action2.component.html',
  styleUrls: ['./action2.component.css'],
})
export class Action2Component implements OnInit {
  fooditems$!: Observable<Foods[]>;
  popUpVisibility: boolean = false;
  selectedFood!: Foods;
  isEdit!: boolean;

  constructor(
    private service: MasterService,
    private store$: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFood();
  }

  getFood() {
    this.store$.dispatch(loadFood());
    this.store$.select(getFoodList).subscribe((item) => {
      this.fooditems$ = of(item);
    });
  }

  editPopUp() {
    this.popUpVisibility = !this.popUpVisibility;
    // console.log(this.popUpVisibility);
    this.isEdit = false;
  }

  onPopupVisibilityChange(e: boolean) {
    this.popUpVisibility = e;
    // console.log(this.popUpVisibility);
  }

  onClickEditFood(f: any) {
    // console.log(f);
    this.isEdit = true;
    this.selectedFood = f.data as Foods;
    // console.log('selected food', this.selectedFood);
    this.popUpVisibility = true;
  }

  onCurrentFoodChange(e: any) {
    console.log('Child data', e);
    if (e.id === 0) {
      console.log('Add data');
      this.fooditems$.subscribe((food) => {
        e.id = food[food.length - 1].id + 1;
      })
      this.store$.dispatch(addFood({ inputdata: e }));
    } else {
      const data = {
        id: e.id,
        category: e.category,
        food_item: e.food_item,
        measure: e.measure.toString(),
        calories: parseInt(e.calories),
        protein: parseInt(e.protein),
        fats: parseInt(e.fats),
        carbs: parseInt(e.carbs),
        fibre: parseInt(e.fibre),
        price: parseInt(e.price),
        food_type: e.food_type,
        rating: parseInt(e.rating),
        serving_size: e.serving_size,
        sugar: parseInt(e.sugar),
      };
      this.store$.dispatch(editFood({ inputdata: data }));
    }
  }

  getDeleteId(e: number){
    console.log('Delete id fetched', e);
    this.store$.dispatch(deleteFood({ inputid: e }));
  }


}
