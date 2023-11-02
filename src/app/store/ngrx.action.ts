import { createAction, props } from "@ngrx/store";
import { Foods } from "../models/fooditem.model";


export const LOAD_FOOD = '[food page] load food';
export const LOAD_FOOD_SUCCESS = '[food page] load food success';
export const LOAD_FOOD_FAIL = '[food page] load food fail';

export const loadFood = createAction(LOAD_FOOD);
export const loadFoodSuccess = createAction(LOAD_FOOD_SUCCESS, props<{ foods: Foods[]}>());
export const loadFoodFail = createAction(LOAD_FOOD_FAIL, props<{ errormsg: string }>());



export const ADD_FOOD = '[food page] add food';
export const ADD_FOOD_SUCCESS = '[food page] add food success';
export const ADD_FOOD_FAIL = '[food page] add food fail';

export const addFood = createAction(ADD_FOOD, props<{ inputdata: Foods}>());
export const addFoodSuccess = createAction(ADD_FOOD_SUCCESS, props<{ inputdata: Foods}>());
export const addFoodFail = createAction(ADD_FOOD_FAIL, props<{ errormsg: string}>());



export const EDIT_FOOD = '[food page] edit food';
export const EDIT_FOOD_SUCCESS = '[food page] edit food success';
export const EDIT_FOOD_FAIL = '[food page] edit food fail';

export const editFood = createAction(EDIT_FOOD, props<{ inputdata: Foods}>());
export const editFoodSuccess = createAction(EDIT_FOOD_SUCCESS, props<{ inputdata: Foods}>());
export const editFoodFail = createAction(EDIT_FOOD_FAIL, props<{ errormsg: string}>());



export const DELETE_FOOD = '[food page] delete food';
export const DELETE_FOOD_SUCCESS = '[food page] delete food success';
export const DELETE_FOOD_FAIL = '[food page] delete food fail';

export const deleteFood = createAction(DELETE_FOOD, props<{ inputid: number}>());
export const deleteFoodSuccess = createAction(DELETE_FOOD_SUCCESS, props<{ inputid: number}>());
export const deleteFoodFail = createAction(DELETE_FOOD_FAIL, props<{ errormsg: string}>());