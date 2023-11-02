import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Foods } from 'src/app/models/fooditem.model';

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
    placeholder: 'Select food type...'
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
      '1 serving'
    ],
    placeholder: 'Select measure...'
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
      '1 serving'
    ],
    placeholder: 'Select serving size...'
  };

  popupTitle!: string;

  constructor() {}

  ngOnInit(): void {}

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
    onClick: this.handleDelete.bind(this),
  };

  handleDelete() {
    // console.log('Delete clicked', this.formData.id)
    this.deleteId.emit(this.formData.id);
    this.popupVisible = false;
  }

  handleSubmit(data: Foods) {
    this.currentFoodChange.emit(data);
    this.popupVisible = false;
  }

  onShowing() {
    this.popupTitle = this.isEditFlag == true ? 'Edit Item' : 'Add Item';

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
}
