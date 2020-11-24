import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

import { Dish } from '../shared/dish';

@Injectable({
    providedIn: 'root'
})
export class DishService {

    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

    public getDishes(): Observable<Dish[]> {
        return this.http.get<Dish[]>(baseURL + 'dishes')
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public getDish(id: string): Observable<Dish> {
        return this.http.get<Dish>(baseURL + 'dishes/' + id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public getFeaturedDish(): Observable<Dish> {
        return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public getDishIds(): Observable<string[] | any> {
        return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
            .pipe(catchError(error => error));
    }

    public putDish(dish: Dish): Observable<Dish> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
