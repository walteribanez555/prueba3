import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl:'./todos.component.html'

})
export class TodosComponent { }
