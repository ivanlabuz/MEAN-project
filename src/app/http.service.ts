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

  server = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.server);
  }

  postList(newList: string) {
    const body = { text: newList };
    return this.http.post(this.server, body);
  }

  postTodo(newCurrentTodo: any) {
    const body = {
      _idList: newCurrentTodo._idList,
      text: newCurrentTodo.text,
      done: newCurrentTodo.done
    };
    return this.http.post(this.server, body);
  }

  putTodo(newTodo: TodoClass) {
    return this.http.put(this.server, newTodo);
  }
}
