import { Component, computed,signal,effect, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Task} from './../../models/task.model';
import { FormControl,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //
  tasks =signal<Task[]>( [
{
  id: Date.now(),
  title:'Crear proyecto',
  completed: false
},
{
  id: Date.now(),
  title:'Crear componentes',
  completed: false
},
]);
//metodo de signal para filtrar todas las tareas
filter = signal<'all' | 'pending' | 'completed'>('all');
tasksByFilter = computed(()=>{
  const filter = this.filter();
  const tasks = this.tasks();
  if(filter === 'pending'){
    return tasks.filter(task => ! task.completed);
  }
  if(filter === 'completed'){
    return tasks.filter(task =>  task.completed);
  }
  return tasks;
})

changeFilter(filter: 'all' | 'pending' | 'completed'){
  this.filter.set(filter);

}


//validaciones del formulario
newTaskCtrl = new FormControl('',{
  nonNullable: true,
  validators:[
    Validators.required,
  ]

});
changeHandler(){
  if(this.newTaskCtrl.valid){
    const value= this.newTaskCtrl.value.trim();
    if(value !== ''){
      this.addTask(value);
      this.newTaskCtrl.setValue('');
    }
  }
  }
//AGREGA UNA TAREA
addTask(title:string){
  const newTask={
    id: Date.now(),
    title,
    completed:false,
  };
  //agrega un nuevo elemento al final de la lista, el metodo update crea un nuevo estado
  this.tasks.update((tasks)=>[...tasks,newTask]);

}
  //ELIMINA UNA TAREA
  deleteTask(index:number){
    this.tasks.update((tasks)=> tasks.filter((task,position)=>position !== index));
  }
  //ACTUALIZA UNA TAREA
  updateTask(index:number){
    this.tasks.update((tasks)=>{
      return tasks.map((task,position)=>{
        if(position === index){
          return {
            ...task,
            completed:!task.completed
          }
        }
        return task;
      })
    })
  }
  //actualizar tarea
  updateTaskEditingMode(index:number){
    this.tasks.update(prevState =>{
      return prevState.map((task,position)=>{
        if(position === index){
          return {
            ...task,
            editing:true
          }
        }
        return {
          ...task,
          editing:false
        }
      })
    });
  }
  //guarda la actualizacion de la tarea editada
  updateTaskEditingText(index:number , event : Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState =>{
      return prevState.map((task,position)=>{
        if(position === index){
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    });
  }

  injector = inject(Injector);
//usando effect en el localstorage

ngOnInit(){
  const storage = localStorage.getItem('tasks');
  if(storage){
    const tasks =JSON.parse(storage);
    this.tasks.set(tasks);
  }
  this.trackTasks();
}
//metodo para traquear tareas
trackTasks(){
  effect(()=>{
    const tasks = this.tasks();
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },{injector:this.injector});
}

}
