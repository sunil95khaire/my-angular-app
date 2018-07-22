import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _baseUrl = 'http://localhost:55537/api/Employee/';

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    let url = this._baseUrl + 'GetEmployees';
    return this._http.get<Employee[]>(url).pipe(tap(), catchError(this.handleError), );
  }

  saveEmployee(employee: Employee): Observable<any> {
    let url = this._baseUrl + 'AddEmployee';
    let body = JSON.stringify(employee);
    return this._http.post(url, body, httpOptions).pipe(tap(), catchError(this.handleError), );
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

  // put(url: string, id: number, model: any): Observable<any> {
  //     let body = JSON.stringify(model);
  //     let headers = new Headers({ 'Content-Type': 'application/json' });
  //     let options = new RequestOptions({ headers: headers });
  //     return this._http.put(url + id, body, options)
  //         .map((response: Response) => <any>response.json())
  //         .catch(this.handleError);
  // }

  // delete(url: string, id: number): Observable<any> {
  //     let headers = new Headers({ 'Content-Type': 'application/json' });
  //     let options = new RequestOptions({ headers: headers });
  //     return this._http.delete(url + id, options)
  //         .map((response: Response) => <any>response.json())
  //         .catch(this.handleError);
  // }
}
