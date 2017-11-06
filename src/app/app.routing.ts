import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TodoListComponent } from "./todo-list/todo-list.component";

const APP_ROUTES: Routes = [
  { path: '', component: TodoListComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);