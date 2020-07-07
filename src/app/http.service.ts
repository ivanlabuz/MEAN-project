import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface TodoClass {
  _id: string;
  _idList: string;
  text: string;
  done: boolean;
}

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:8000/');
  }

  postList(newList: string) {
    const body = { text: newList };
    return this.http.post('http://localhost:8000/', body);
  }

  postTodo(newCurrentTodo: any) {
    const body = {
      _idList: newCurrentTodo._idList,
      text: newCurrentTodo.text,
      done: newCurrentTodo.done
    };
    return this.http.post('http://localhost:8000/', body);
  }

  putTodo(newTodo: TodoClass) {
    return this.http.put('http://localhost:8000/', newTodo);
  }
}
