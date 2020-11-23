import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { Dish } from '../shared/dish';

@Injectable({
    providedIn: 'root'
})
export class DishService {

    constructor(private http: HttpClient) { }

    public getDishes(): Observable<Dish[]> {
        return this.http.get<Dish[]>(baseURL + 'dishes');
    }

    public getDish(id: string): Observable<Dish> {
        return this.http.get<Dish>(baseURL + 'dishes/' + id);
    }

    public getFeaturedDish(): Observable<Dish> {
        return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
    }

    public getDishIds(): Observable<string[] | any> {
        return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
    }
}
