import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Foods } from 'src/app/models/fooditem.model';
import { loadFood } from 'src/app/store/ngrx.action';
import { getFoodList } from 'src/app/store/ngrx.selector';

@Component({
  selector: 'app-action3',
  templateUrl: './action3.component.html',
  styleUrls: ['./action3.component.css'],
})
export class Action3Component implements OnInit {
  @Input() popupVisible!: boolean;
  @Output() popupVisibleChange = new EventEmitter<boolean>();

  @Input() currentFood!: Foods;
  @Output() currentFoodChange = new EventEmitter<Foods>();

  @Input() isEditFlag!: boolean;
  @Output() isEditFlagChange = new EventEmitter<boolean>();

  @Output() deleteId = new EventEmitter<number>();

  formData!: Foods;

  seeDetailData!: Foods;

  // selectBoxFoodType = [
  //   {
  //     display: 'Veg',
  //     value: 'veg'
  //   },
  //   {
  //     display: 'Non-Veg',
  //     value: 'non-veg'
  //   }
  // ];

  foodtypeEditorOptions = {
    items: ['veg', 'non-veg'],
    placeholder: 'Select food type...',
  };

  measureEditorOptions = {
    items: [
      '100ml',
      '125ml',
      '1/2 cup',
      '1 cup',
      '1 small',
      '1 medium',
      '1 large',
      '1 ounce',
      '3 ounces',
      '33gm',
      '100gm',
      '1 plate',
      '1 slice',
      '1 piece',
      '1 bowl',
      '1 serving',
    ],
    placeholder: 'Select measure...',
  };

  servingsizeEditorOptions = {
    items: [
      '1/2 cup',
      '1 cup',
      '1 small',
      '1 medium',
      '1 large',
      '1 ounce',
      '3 ounces',
      '1 scoop',
      '1 slice',
      '1 piece',
      '1 plate',
      '1 bowl',
      '1 serving',
    ],
    placeholder: 'Select serving size...',
  };

  formTitle!: string;

  deletePopupVisibility!: boolean;

  editingChangePopupVisibility: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      console.log(param);
      if (param) {
        this.store.dispatch(loadFood());
        this.store.select(getFoodList).subscribe((item) => {
          this.seeDetailData = item.find(
            (d) => d.id == parseInt(param['id'])
          ) as Foods;
        });
      }
    });
  }

  onHidden() {
    // console.log('showCloseButtonChange');
    this.popupVisible = false;
    this.popupVisibleChange.emit(this.popupVisible);
  }

  onValueChanged(e: any) {
    console.log(e);
    this.formData.food_type = e.value;
  }

  submitButtonOptions = {
    text: 'Submit Value',
    icon: 'save',
    type: 'success',
    useSubmitBehavior: true,
  };

  deleteButtonOptions = {
    text: 'Delete',
    type: 'danger',
    icon: 'trash',
    onClick: this.onClickDelete.bind(this),
  };

  handleDelete() {
    // console.log('Delete clicked', this.formData.id)
    this.deleteId.emit(this.formData.id);
    this.deletePopupVisibility = false;
    this.popupVisible = false;
  }

  handleSubmit(data: Foods) {
    console.log('Submit clicked', data);
    this.currentFoodChange.emit(data);
    this.editingChangePopupVisibility = false;
    this.popupVisible = false;
  }

  onShowing() {
    this.formTitle = this.isEditFlag == true ? 'Edit Item' : 'Add Item';

    if (!this.isEditFlag) {
      this.formData = {
        id: 0,
        category: '',
        food_item: '',
        measure: '',
        calories: 0,
        protein: 0,
        fats: 0,
        carbs: 0,
        fibre: 0,
        price: 0,
        food_type: '',
        rating: 0,
        serving_size: '',
        sugar: 0,
      };
    } else {
      this.formData = { ...this.currentFood };
    }
  }

  onClickDelete() {
    this.deletePopupVisibility = true;
  }

  onCloseEditPopup(data: Foods) {
    console.log('editing confirmation', this.currentFood, data);
    if (this.isEditFlag == true) {
      if (
        data.calories != this.currentFood.calories ||
        data.carbs != this.currentFood.carbs ||
        data.category != this.currentFood.category ||
        data.fats != this.currentFood.fats ||
        data.fibre != this.currentFood.fibre ||
        data.food_item != this.currentFood.food_item ||
        data.food_type != this.currentFood.food_type ||
        data.measure != this.currentFood.measure ||
        data.price != this.currentFood.price ||
        data.protein != this.currentFood.protein ||
        data.rating != this.currentFood.rating ||
        data.serving_size != this.currentFood.serving_size ||
        data.sugar != this.currentFood.sugar
      ) {
        this.editingChangePopupVisibility = true;
      } else {
        this.editingChangePopupVisibility = false;
        this.popupVisible = false;
      }
    }
    else{
      this.popupVisible = false;
    }
  }

  onClickNoEditSaveChanges() {
    this.editingChangePopupVisibility = !this.editingChangePopupVisibility;
    this.popupVisible = false;
  }

  onClickCancelEditSaveChanges() {
    this.editingChangePopupVisibility = false;
  }
}
