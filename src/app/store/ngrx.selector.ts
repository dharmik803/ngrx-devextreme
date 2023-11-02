import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Foods } from "../models/fooditem.model";
import { AppState } from "./ngrx.state";


export const selectFoods = createFeatureSelector<AppState>('food');

export const getFoodList = createSelector(selectFoods, (state) => {
    return state.foods;
})