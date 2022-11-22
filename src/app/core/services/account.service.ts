import {HttpBackend, HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, filter, catchError, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Account, ParamSearch} from '../model/account.model';

@Injectable()
export class AccountService {
  // tslint:disable-next-line:variable-name
  private _refreshRequired = new Subject<void>();
  get requiredRefresh(){
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) {
  }


  getAccounts(param: ParamSearch): Observable<any> {
    let params = new HttpParams();
    params = params.append('limit', param.limit.toString());
    params = params.append('start', param.start.toString());
    params = params.append('last_name', param.last_name ? param.last_name.toString() : '');
    params = params.append('first_name', param.first_name ? param.first_name.toString() : '');
    params = params.append('gender', param.gender ? param.gender.toString() : '');
    params = params.append('email', param.email ? param.email.toString() : '');
    params = params.append('address', param.address ? param.address.toString() : '');
    return this.http.get<Account[]>('/accounts', {
      params
    });
  }

  addAccount(acc: Account): Observable<any> {
    return this.http.post('/accounts', acc).pipe(
      tap(() => {
        this._refreshRequired.next()
      })
    );
  }

  editAccount(acc: Account,id:any): Observable<any> {
    return this.http.put('/accounts/' + id, acc);
  }

  deleteAccount(acc: Account): Observable<any> {
    return this.http.delete('/accounts/' + acc._id);
  }

}
