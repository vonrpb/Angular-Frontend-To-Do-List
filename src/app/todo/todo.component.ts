import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from "../todo.interface";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
	@Input() todo: Todo;
	@Output() todoChanges = new EventEmitter<Todo>();
	TodoEditField = '';
	editClicked = false;
	ChangeStatus = 'checked';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onEditTodo() {
  	this.editClicked = true;
  	this.TodoEditField = this.todo.todolist;
  }

  onCancel() {
    this.TodoEditField = '';
    this.editClicked = false;
  }

  onAddStatus(){
  	this.todoService.addStatus(this.todo.id, this.ChangeStatus)
     .subscribe(
        (todo: Todo) => {
          this.todo.status = this.ChangeStatus;
          if(this.ChangeStatus == "checked") {
          	this.ChangeStatus = "notchecked";
          } else {
          	this.ChangeStatus = "checked";
          }
        }
      );
  }

  onUpdateTodo() {
    this.todoService.updateTodo(this.todo.id, this.TodoEditField)
      .subscribe(
        (todo: Todo) => {
          this.todo.todolist = this.TodoEditField;
          this.TodoEditField = '';
        }
      );
    this.editClicked = false;
  }

  onDelete() {
    this.todoService.destroyTodo(this.todo.id)
      .subscribe(
        () => {
          this.todoChanges.emit(this.todo);
          alert('Successfully deleted');
        }
      );
  }

 

  
  

}
