import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  url = 'http://localhost:3000/lists'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os dados
  getLists(): Observable<List[]> {
    return this.httpClient.get<List[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um dado pelo id
  getListById(id: number): Observable<List> {
    return this.httpClient.get<List>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um dado
  saveList(list: List): Observable<List> {
    return this.httpClient.post<List>(this.url, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um dado
  updateList(list: List): Observable<List> {
    return this.httpClient.put<List>(this.url + '/' + list.id, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um dado
  deleteList(list: List) {
    return this.httpClient.delete<List>(this.url + '/' + list.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
