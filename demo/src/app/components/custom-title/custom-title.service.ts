import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from './customTitle.model';

@Injectable({
  providedIn: 'root'
})
export class CustomTitleService {
  URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAllCustomTitle(): Observable<any> {
    return this.http.get<Title[]>(this.URL + `/getAllCustomTitles`);
  }

  AddNewTitle(newTitle): Observable<any> {
    return this.http.post<Title>(this.URL + `/addCustomTitles`, newTitle);
  }

  updateTitle(id, data): Observable<any> {
    return this.http.put<Title>(this.URL + `/updateCustomTitle/${id}`, data);
  }

  deleteTitle(id): Observable<any> {
    return this.http.delete<Title>(this.URL + `/deleteCustomTitle/${id}`);
  }
}
