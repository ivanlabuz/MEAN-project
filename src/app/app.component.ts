import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { HttpService } from './http.service';

interface Todo {
  _id: string;
  _idList: string;
  text: string;
  done: boolean;
}

interface TodoList {
  _id: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})

export class AppComponent implements OnInit {
  filter = false;
  listOfLists = true;
  currentIdList: string;
  newNameForList: string;
  searchText: RegExp;
  errorList: any;
  errorTodo: any;
  noTodo = true;
  todoLists: TodoList[] = [];
  todos: Todo[] = [];
  isLoading = true;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getData().subscribe(
      (data: Array<Array<TodoList>>) => this.todoLists = data[0],
      error => { this.errorList = error.message; console.log(error); });
    this.httpService.getData().subscribe(
      (data: Array<Array<Todo>>) => { this.todos = data[1], this.isLoading = false; },
      error => { this.errorTodo = error.message; console.log(error); });
  }

  changeDone(id: string): void {
    const editTodo = this.todos.find(item => item._id === id);
    editTodo.done = true;
    this.httpService.putTodo(editTodo).subscribe(
      (data: Todo) => data,
      error => { this.errorTodo = error.message; console.log(error); });
    this.todos.forEach(item => {
      if (item._id === id) {
        item.done = true;
      }
    });
  }

  onChangeFilter(event: MatRadioChange): void {
    this.filter = !this.filter;
  }

  newTodo(value: string): void {
    if (value) {
      const newCurrentTodo = {
        _idList: this.currentIdList,
        text: value,
        done: false
      };
      this.httpService.postTodo(newCurrentTodo)
        .subscribe(
          (data: Todo) => this.todos.push(data),
          error => console.log(error)
        );
      this.noTodo = true;
    }
  }

  counterAllTodos(id: string): number {
    if (this.todos.length) {
      return this.todos.filter(item => item._idList === id).length;
    } else {
      return 0;
    }
  }

  counterDoneTodos(id: string): number {
    if (this.todos.length) {
      return this.todos
        .filter(item => item._idList === id)
        .filter(item => item.done === true).length;
    } else {
      return 0;
    }
  }

  inList(id: string): void {
    this.listOfLists = false;
    this.currentIdList = id;
    if (!this.todos.filter(item => item._idList === id).length) {
      this.noTodo = false;
    }
  }

  outList(): void {
    this.listOfLists = true;
    this.filter = false;
  }

  addList(newList: string): void {
    if (newList) {
      this.httpService.postList(newList)
        .subscribe(
          (data: TodoList) => this.todoLists.push(data),
          error => console.log(error)
        );
    }
  }

  newListName(event: any): void {
    this.newNameForList = event.target.value;
  }

  clickCreate(): void {
    if (this.newNameForList) {
      this.httpService.postList(this.newNameForList)
        .subscribe(
          (data: TodoList) => this.todoLists.push(data),
          error => console.log(error)
        );
    }
  }

  searchValue(event: any): void {
    if (event) {
      this.searchText = new RegExp(event.target.value, 'gi');
    }
  }

  searchTodo(text: string): boolean {
    if (this.searchText) {
      return this.searchText.test(text);
    }
  }

  searchTextReset(): void {
    this.searchText = undefined;
  }
}

