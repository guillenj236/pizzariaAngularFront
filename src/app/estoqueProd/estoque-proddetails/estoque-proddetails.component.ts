import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { EstoqueProd } from '../estoqueProd';
import { EstoqueProdService } from 'src/app/service/estoque-prod.service';

@Component({
  selector: 'app-estoque-proddetails',
  templateUrl: './estoque-proddetails.component.html',
  styleUrls: ['./estoque-proddetails.component.scss']
})
export class EstoqueProddetailsComponent {

  @Input() estoqueProd: EstoqueProd = new EstoqueProd();
  @Output() retorno = new EventEmitter<EstoqueProd>();

  estoqueProdService = inject(EstoqueProdService);

  constructor(){}

  salvar(){
    this.estoqueProdService.save(this.estoqueProd).subscribe({
      next: estoqueProd => {
        this.retorno.emit(estoqueProd);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
  deletar(){
    this.estoqueProdService.delete(this.estoqueProd.id).subscribe({
      next: estoqueProd => {
          this.retorno.emit(estoqueProd);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
}
