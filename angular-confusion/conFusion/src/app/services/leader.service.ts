import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Leader } from '../shared/leader';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
    providedIn: 'root'
})
export class LeaderService {

    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

    public getLeaders(): Observable<Leader[]> {
        return this.http.get<Leader[]>(baseURL + 'leadership')
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public getLeader(id: string): Observable<Leader> {
        return this.http.get<Leader>(baseURL + 'leadership/' + id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public getFeaturedLeader(): Observable<Leader> {
        return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(dishes => dishes[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
