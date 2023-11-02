import { Foods } from "../models/fooditem.model";

export interface AppState {
    foods: Foods[],
    errormsg: string
}

export const initialState : AppState = {
    foods: [],
    errormsg: ''
}