import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GrandPrix } from 'app/main/model/GrandPrix';
import { PagedData } from 'app/main/model/PagedData';
import { ResponseData } from 'app/main/model/ResponseData';
import { Result } from 'app/main/model/Result';
import { Season } from 'app/main/model/Season';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public apiData: any;
  public onBlogListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onBlogListChanged = new BehaviorSubject({});
  }
  private readonly currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );
  private readonly token = this.currentUser.token;
  private option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token,
    },
  };

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([]).then(() => {
        resolve();
      }, reject);
    });
  }

  
  public search(body): Observable<ResponseData<PagedData<Result>>> {
    return this._httpClient.post<ResponseData<PagedData<Result>>>(
      `${environment.apiUrl}/result/list`,body,
      this.option
    );
  }

  public getAllGrandPrix(): Observable<any> {
    return this._httpClient.get<ResponseData<GrandPrix>>(
      `${environment.apiUrl}/grandPrix/get-all`,
      this.option
    );
  }

  public createResult(body): Observable<ResponseData<Result>> {
    return this._httpClient.post<ResponseData<Result>>(
      `${environment.apiUrl}/result/create`,body,
      this.option
    );
  }

  public updateResult(body): Observable<ResponseData<Result>> {
    return this._httpClient.put<ResponseData<Result>>(
      `${environment.apiUrl}/result/update`,body,
      this.option
    );
  }

  public getAllSeason(): Observable<any> {
    return this._httpClient.get<ResponseData<Season>>(
      `${environment.apiUrl}/season/get-all`,
      this.option
    );
  }


  public searchGrandPrix(body): Observable<ResponseData<PagedData<GrandPrix>>> {
    return this._httpClient.post<ResponseData<PagedData<GrandPrix>>>(
      `${environment.apiUrl}/grandPrix/list`,body,
      this.option
    );
  }
}
