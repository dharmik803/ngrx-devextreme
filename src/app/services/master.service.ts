import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foods } from '../models/fooditem.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/foodItems';

  getAllFoods(){
    return this.http.get<Foods[]>(this.url);
  }
  
  getFoodById(id: number){
    return this.http.get(`${this.url}/${id}`);
  }

  addFood(food: Foods){
    return this.http.post<Foods>(this.url, food);
  }

  updateFood(food: Foods){
    return this.http.put<Foods>(`${this.url}/${food.id}`, food);
  }

  deleteFood(id: number){
    return this.http.delete<Foods>(`${this.url}/${id}`);
  }
}
