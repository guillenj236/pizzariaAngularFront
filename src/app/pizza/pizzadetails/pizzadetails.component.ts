import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Pizza } from '../pizza';
import { PizzaService } from 'src/app/service/pizza.service';
import { Sabores } from 'src/app/sabores/sabores';

@Component({
  selector: 'app-pizzadetails',
  templateUrl: './pizzadetails.component.html',
  styleUrls: ['./pizzadetails.component.scss']
})
export class PizzadetailsComponent {

  @Input() pizza: Pizza = new Pizza();
  @Output() retorno = new EventEmitter<Pizza>();

  sabores: Sabores[] = [];
  sabor!:Sabores;

  pizzaService = inject(PizzaService);

  constructor(){

    this.pizzaService.getAvailableSabores().subscribe( sabores => {
      this.sabores = sabores;
    })
  }

  salvar(){
    if(this.pizza.id > 0){
      this.pizzaService.update(this.pizza).subscribe({
        next: pizza => {
            this.retorno.emit(this.pizza);
            alert('Pizza Editada!!');
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else{
      this.pizzaService.save(this.pizza).subscribe({
        next: pizza => {
          this.retorno.emit(pizza);
          alert('Pizza Cadastrada!!');
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });
    }
  }


  deletar(){
    this.pizzaService.delete(this.pizza.id).subscribe({
      next: pizza =>{
          this.retorno.emit(pizza);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    })
  }
}
