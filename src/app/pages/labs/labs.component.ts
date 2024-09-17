import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks =signal( [
      'Instalar angular CLI',
      'Crear proyecto',
      'Crear Componentes'
  ]);
  name = signal('Cindy');
  age = '28';
  disable = true;
  img= 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'Cindy',
    age:18,
    avatar:'https://w3schools.com/howto/img_avatar.png'
  });

  colorCrt = new FormControl();
  withCrt = new  FormControl(50,{
    nonNullable:true,
  });
//validacion del campo que aparezca mensaje de invalido
  nameCrt = new  FormControl('cindy',{
    nonNullable:true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor(){
    this.colorCrt.valueChanges.subscribe(value =>{
      console.log(value);
    })
  }
  clickHandler(){
    alert('Hola');
  }
  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return{
        ...prevState,
        age: parseInt(newValue,10)
      }
    });
  }

  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return{
        ...prevState,
        name: newValue
      }
    });
  }
}



