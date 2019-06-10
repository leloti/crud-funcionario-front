import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Funcionario } from '../classes/Funcionario';
import { MessageService } from '../servicos/message.service';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json'}
    )
};

const apiBasePath = 'http://localhost:8080/api/'
const endpointListarFuncionarios = apiBasePath + 'funcionarios'
const endpointFuncionario = apiBasePath + 'funcionario'

@Injectable({
  providedIn: 'root'
})

export class FuncionariosService {

  constructor(
    private http: HttpClient, 
    private messageService: MessageService) { }

  /** Buscar todos os funcionarios */
  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(endpointListarFuncionarios)
      .pipe(
        tap(funcionarios => console.log('buscou os funcionarios')),
        catchError(this.handleError('getFuncionarios', []))
      );
  }

  /** Cadastrar um novo funcionário */
  adicionarFuncionario (funcionario: Funcionario): Observable<Funcionario> {
    return  this.http.post<Funcionario>(endpointFuncionario, funcionario, httpOptions).pipe(
      tap((funcionario: Funcionario) => 
      {
        console.log('adicionou funcionario ' + funcionario.id)}
      ),
      catchError(
        this.handleError<Funcionario>('adicionar Funcionario')
      )
    )
  }

  editarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    const url = endpointFuncionario + "/" + funcionario.id; 
    return  this.http.put<Funcionario>(url, funcionario, httpOptions).pipe(
      tap((funcionario: Funcionario) => 
      {
        console.log('editou funcionario ' + funcionario.id)}
      ),
      catchError(
        this.handleError<Funcionario>('editar Funcionario')
      )
    )
  }

  /** Deletar um funcionario */
  deletarFuncionario (funcionario: Funcionario | number): Observable<Funcionario> {
    const id = typeof funcionario === 'number' ? funcionario : funcionario.id;
    const url = endpointFuncionario + "/" + id; 
  
    return this.http.delete<Funcionario>(url, httpOptions).pipe(
      tap(_ => console.log('deletou funcionario id=' + id)),
      catchError(this.handleError<Funcionario>('deleteFuncionario'))
    );
  }

  consultarFuncionarioId (id: number): Observable<Funcionario> {
    const url = endpointFuncionario + "/" + id; 

    return this.http.get<Funcionario>(url, httpOptions).pipe(
      tap(_ => console.log('Consultou funcionario com id = ' + id)),
      catchError(this.handleError<Funcionario>('consultarFuncionarioId'))
    );
  }

  private log(message: string) {
    this.messageService.add(`Funcionario: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} falhou: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
