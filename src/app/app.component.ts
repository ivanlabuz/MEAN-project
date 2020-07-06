import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

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
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  filter = false;
  listOfLists = true;
  currentIdList: string;
  newNameForList: string;
  searchText: RegExp;

  todoLists: TodoList[] = [
    {
      _id: '1',
      text: 'Список на сегодня'
    },
    {
      _id: '2',
      text: 'Список на завтра'
    }
  ];

  todos: Todo[] = [
    {
      _id: '100',
      _idList: '1',
      text: 'Купить продукты',
      done: false
    },
    {
      _id: '101',
      _idList: '1',
      text: 'Купить носки',
      done: false
    },
    {
      _id: '102',
      _idList: '1',
      text: 'Купить табак',
      done: true
    },
    {
      _id: '103',
      _idList: '2',
      text: 'Купить еду',
      done: false
    },
    {
      _id: '104',
      _idList: '2',
      text: 'Купить собаку',
      done: true
    },
  ];

  changeDone(id: string): void {
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
      this.todos.push({
        _id: 'new Date().getTime()',
        _idList: this.currentIdList,
        text: value,
        done: false
      });
    }
  }

  counterAllTodos(id: string): number {
    return this.todos.filter(item => item._idList === id).length;
  }
  counterDoneTodos(id: string): number {
    return this.todos.filter(item => item._idList === id).filter(item => item.done === true).length;
  }

  inList(id: string): void {
    this.listOfLists = false;
    this.currentIdList = id;
  }

  outList(): void {
    this.listOfLists = true;
    this.filter = false;
  }

  addList(newList: string): void {
    if (newList) {
      this.todoLists.push({
        _id: 'new Date().getTime()',
        text: newList
      });
    }
  }

  newListName(event: any): void {
    this.newNameForList = event.target.value;
  }

  clickCreate(): void {
    if (this.newNameForList) {
      this.todoLists.push({
        _id: 'new Date().getTime()',
        text: this.newNameForList
      });
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

