import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Funcionario } from '../funcionario';
import { FuncionarioService } from 'src/app/service/funcionario.service';

@Component({
  selector: 'app-funcionariodetails',
  templateUrl: './funcionariodetails.component.html',
  styleUrls: ['./funcionariodetails.component.scss']
})
export class FuncionariodetailsComponent {

  @Input() funcionario: Funcionario = new Funcionario();
  @Output() retorno = new EventEmitter<Funcionario>();

  funcionarioService = inject(FuncionarioService);

  constructor(){

  }
  salvar(){
    if(this.funcionario.id > 0){
      this.funcionarioService.update(this.funcionario).subscribe({
          next: funcionario => {
            this.retorno.emit(this.funcionario);
          },
          error: erro => {
            alert('Error!! verificar no console!!');
            console.error(erro);
          }
      });
    }else{
      this.funcionarioService.save(this.funcionario).subscribe({
        next: funcionario => {
            this.retorno.emit(funcionario);
        },
         error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });
    }
  }
  deletar(){
    this.funcionarioService.delete(this.funcionario.id).subscribe({
      next: funcionario => {
        this.retorno.emit(funcionario);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
 
}
