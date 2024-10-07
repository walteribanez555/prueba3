import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl : './create-todo.component.html',

})
export class CreateTodoComponent {


  @Output( ) onSubmitEvent = new EventEmitter();

  form : FormGroup = new FormGroup({
    todo : new FormControl(null, [Validators.required]),
    completed : new FormControl(false, [Validators.required]),
  });



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


  onSubmit(  ) {
    if(!this.form.valid) return;


    this.onSubmitEvent.emit(this.form.value);
  }



}
