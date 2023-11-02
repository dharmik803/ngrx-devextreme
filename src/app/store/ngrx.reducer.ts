import { createReducer, on } from "@ngrx/store";
import { initialState } from "./ngrx.state";
import { addFoodSuccess, deleteFoodSuccess, editFoodSuccess, loadFoodFail, loadFoodSuccess } from "./ngrx.action";



export const _foodReducer = createReducer(

    initialState,
    on(loadFoodSuccess, (state, action) => {
        return {
            ...state,
            foods: [ ...action.foods ],
            errormsg: ''
        }
    }),

    on(loadFoodFail, (state, action) => {
        return {
            ...state,
            foods: [],
            errormsg: action.errormsg
        }
    }),

    on(editFoodSuccess, (state, action) => {
        const _food = { ...action.inputdata }
        const updateFood = state.foods.map(food => {
            return _food.id === food.id ? _food : food;
        })
        return {
            ...state,
            foods: updateFood,
            errormsg: ''
        }
    }),

    on(addFoodSuccess, (state, action) => {
        
        return {
            ...state,
            foods: [ ...state.foods, action.inputdata ],
            errormsg: ''
        }
    }),

    on(deleteFoodSuccess, (state, action) => {
        const updatedFood = state.foods.filter(food => food.id != action.inputid);
        return {
            ...state,
            foods: updatedFood,
            errormsg: ''
        }
    })

);

export function foodReducer(state: any, action: any){
    return _foodReducer(state, action);
}