import { Injectable } from "@angular/core";
import { MasterService } from "../services/master.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { 
    addFood, 
    addFoodFail, 
    addFoodSuccess, 
    deleteFood, 
    deleteFoodFail, 
    deleteFoodSuccess, 
    editFood, 
    editFoodFail, 
    editFoodSuccess, 
    loadFood, 
    loadFoodFail, 
    loadFoodSuccess 
} from "./ngrx.action";


@Injectable()
export class FoodEffects {

    constructor(
        private serv: MasterService,
        private actions$: Actions
    ){}

    loadFoodEffect$ = createEffect(() => this.actions$.pipe(
        ofType(loadFood),
            exhaustMap(action => {
                return this.serv.getAllFoods().pipe(
                    map((items) => {
                        return loadFoodSuccess( { foods: items })
                    }),
                    catchError((error) => {
                        return of(loadFoodFail({errormsg: error.message}))
                    })
            )})
    ))

    addFoodEffect$ = createEffect(() => this.actions$.pipe(
        ofType(addFood),
            exhaustMap(action => {
                return this.serv.addFood(action.inputdata).pipe(
                    map((items) => {
                        return addFoodSuccess( { inputdata: action.inputdata })
                    }),
                    catchError((error) => {
                        return of(addFoodFail({errormsg: error.message}))
                    })
            )})
    ))

    editFoodEffect$ = createEffect(() => this.actions$.pipe(
        ofType(editFood),
            exhaustMap(action => {
                return this.serv.updateFood(action.inputdata).pipe(
                    map((items) => {
                        return editFoodSuccess( { inputdata: action.inputdata })
                    }),
                    catchError((error) => {
                        return of(editFoodFail({errormsg: error.message}))
                    })
            )})
    ))

    deleteFoodEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deleteFood),
            exhaustMap(action => {
                return this.serv.deleteFood(action.inputid).pipe(
                    map((items) => {
                        return deleteFoodSuccess( { inputid: action.inputid } )
                    }),
                    catchError((error) => {
                        return of(deleteFoodFail( { errormsg: error.message }))
                    })
                )
            })
    ))

}