import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Sabores } from '../sabores';
import { SaboresService } from 'src/app/service/sabores.service';

@Component({
  selector: 'app-saboresdetails',
  templateUrl: './saboresdetails.component.html',
  styleUrls: ['./saboresdetails.component.scss']
})
export class SaboresdetailsComponent {

  @Input() sabores: Sabores = new Sabores();
  @Output() retorno = new EventEmitter<Sabores>();

  saboresService = inject(SaboresService);

  constructor(){

  }
  salvar(){
    if(this.sabores.id>0){
      this.saboresService.update(this.sabores).subscribe({
        next: sabores => {
          this.retorno.emit(sabores);
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });
    }else{
    this.saboresService.save(this.sabores).subscribe({
      next: sabores => {
        this.retorno.emit(sabores);
      },
      error: erro => {
        alert('Erro!! verificar no console!!');
        console.error(erro);
      }
    });
    }
  }
  deletar(){
    this.saboresService.delete(this.sabores.id).subscribe({
      next: sabores => {
        this.retorno.emit(sabores);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }

}
