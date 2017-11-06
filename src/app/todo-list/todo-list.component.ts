import { Component, OnInit} from '@angular/core';
import { Response } from '@angular/http';

import { NgForm } from '@angular/forms';
import { TodoService } from "../todo.service";
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})

export class TodoListComponent implements OnInit {

  ProjectName = "Todo List";
  todolistinput = "";
	todolist: Todo[];

  constructor(private todoService: TodoService) { 
    }

  ngOnInit() {
    this.onGetTodolist();
  }

  onGetTodolist() {
    this.todoService.getTodolist()
      .subscribe(
        (todolist: Todo[]) => this.todolist = todolist,
        (error: Response) => console.log(error)
      );
  }

  onDelete(todo: Todo) {
    const pos = this.todolist.findIndex(
        (todoE: Todo) => {
          return todoE.id == todo.id;
        }
      );
    this.todolist.splice(pos, 1)
  }

   onTodoCreate(form: NgForm) {
    this.todoService.createNewTodo(form.value.todolist)
      .subscribe(
        () => {
          this.onGetTodolist()
          alert('Successfully Create A New Todo List!')
          }
        );
      this.todolistinput = "";
      form.reset();
  }
  
}
