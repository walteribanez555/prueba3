import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoEntity } from '../../../domain/entities/todo.entity';
import { StatusAction } from '../../../application/enums/StatusAction.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl : './todo.component.html'
})
export class TodoComponent {



  @Output() onDeleteEvent = new EventEmitter();
  @Output() onStatusChangeEvent = new EventEmitter();
  @Input() todo! : TodoEntity;

  listStates  = [
    {
      name : 'Completed',
      completed : true,
    },
    {
      name : 'Incompleted',
      completed : false,
    }
  ]

  onStatusChange(event : any){
    this.onStatusChangeEvent.emit({
      id : this.todo.id,
      completed: event
    })

  }

  onDelete() {
    this.onDeleteEvent.emit({
      id : this.todo.id
    })
  }




 }
