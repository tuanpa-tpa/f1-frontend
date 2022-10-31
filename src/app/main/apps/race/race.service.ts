import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GrandPrix } from 'app/main/model/GrandPrix';
import { PagedData } from 'app/main/model/PagedData';
import { ResponseData } from 'app/main/model/ResponseData';
import { Season } from 'app/main/model/Season';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

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

  
  public search(body): Observable<ResponseData<PagedData<GrandPrix>>> {
    return this._httpClient.post<ResponseData<PagedData<GrandPrix>>>(
      `${environment.apiUrl}/grandPrix/list`,body,
      this.option
    );
  }

  public getAllSeason(): Observable<any> {
    return this._httpClient.get<ResponseData<Season>>(
      `${environment.apiUrl}/season/get-all`,
      this.option
    );
  }

  public getAllGrandPrix(): Observable<any> {
    return this._httpClient.get<ResponseData<GrandPrix>>(
      `${environment.apiUrl}/grandPrix/get-all`,
      this.option
    );
  }

  public deleteGrandPrix(id): Observable<any> {
    return this._httpClient.delete<ResponseData<Boolean>>(
      `${environment.apiUrl}/grandPrix/delete/${id}`,
      this.option
    );
  }

  public getGrandPrix(id): Observable<any> {
    return this._httpClient.get<ResponseData<GrandPrix>>(
      `${environment.apiUrl}/grandPrix/${id}`,
      this.option
    );
  }

  public createGrandPrix(body): Observable<ResponseData<GrandPrix>> {
    return this._httpClient.post<ResponseData<GrandPrix>>(
      `${environment.apiUrl}/grandPrix/create`,body,
      this.option
    );
  }

  public updateGrandPrix(body): Observable<ResponseData<GrandPrix>> {
    return this._httpClient.put<ResponseData<GrandPrix>>(
      `${environment.apiUrl}/grandPrix/update`,body,
      this.option
    );
  }

}
