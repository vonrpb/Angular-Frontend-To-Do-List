import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/Rx';

@Injectable()
export class TodoService {
  private baseUrl = 'http://127.0.0.1:8000';
  constructor(private http: Http) {

  }

  getTodolist(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/todos')
      .map(
        (response: Response) => {
          return response.json().todolist;
        }
      );
  }

  createNewTodo(todolist: string) {
    const body = JSON.stringify({todolist: todolist});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl + '/api/todo', body, {headers: headers})
    .map(
        (response: Response) => response.json()
      );
  }

  updateTodo(id: number, Newtodolist: string) {
    const body = JSON.stringify({todolist: Newtodolist});
    const headers = new Headers({'Content-Type': 'application/json'});
    console.log(id + body, {headers: headers});
    return this.http.put(this.baseUrl + '/api/todo/' + id , body, {headers: headers})
      .map(
        (response: Response) => response.json()
      );
  }

  destroyTodo(id: number) {
    return this.http.delete(this.baseUrl + '/api/todo/' + id);
  }
  
  addStatus(id: number, status: string) {
    const body = JSON.stringify({status: status});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch(this.baseUrl + '/api/todo/' + id , body, {headers: headers})
      .map((response: Response) => response.json());
  }

}