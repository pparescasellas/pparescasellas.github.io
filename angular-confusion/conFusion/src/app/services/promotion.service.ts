import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Promotion } from '../shared/promotion';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

    public getPromotions(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(baseURL + 'promotions')
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public getPromotion(id: string): Observable<Promotion> {
        return this.http.get<Promotion>(baseURL + 'promotions/' + id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public getFeaturedPromotion(): Observable<Promotion> {
        return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(dishes => dishes[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
