import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PagedData } from 'app/main/model/PagedData';
import { Racer } from 'app/main/model/Racer';
import { RankingTeam } from 'app/main/model/RankingTeam';
import { ResponseData } from 'app/main/model/ResponseData';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  public apiData: any;
  public onBlogListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onBlogListChanged = new BehaviorSubject({});
  }
  onDatatablessChanged: BehaviorSubject<any>;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([]).then(() => {
        resolve();
      }, reject);
    });
  }

  public getRankingTeam(body): Observable<ResponseData<PagedData<RankingTeam>>> {
    console.log("abc");
    return this._httpClient.post<ResponseData<PagedData<RankingTeam>>>(
      `${environment.apiUrl}/ranking/team`,body, {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
  }

  public getRacerOfTem(id): Observable<ResponseData<Racer>> {
    console.log("getRacerOfTem");
    return this._httpClient.get<ResponseData<Racer>>(
      `${environment.apiUrl}/ranking/info/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
  }

  public getRacer(id): Observable<ResponseData<Racer>> {
    console.log("getRacer");
    return this._httpClient.get<ResponseData<Racer>>(
      `${environment.apiUrl}/ranking/racer/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
  }
}
