import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get isSuperAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === [Role.SuperAdmin];
  }
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === [Role.Admin];
  }
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === [Role.User];
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/authenticate`, { email, password }, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      .pipe(
        map(user => {
          console.log(user.data)
          if (user.data && user.data.token) {
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            if(user.data){
              setTimeout(() => {
                this._toastrService.success(
                  'Đăng nhập thành công🎉',
                  '👋 Chào mừng, ' + user.data.name + '!',
                  { toastClass: 'toast ngx-toastr', closeButton: true }
                );
              }, 3000);
            }else{
              
            }
            // notify
            this.currentUserSubject.next(user.data);
          }
          return user.data;
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
}
