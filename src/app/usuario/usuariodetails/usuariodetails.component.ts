import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Endereco } from 'src/app/endereco/endereco';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuariodetails',
  templateUrl: './usuariodetails.component.html',
  styleUrls: ['./usuariodetails.component.scss']
})
export class UsuariodetailsComponent {

  @Input() usuario: Usuario = new Usuario();
  @Output() retorno = new EventEmitter<Usuario>();

  usuarioService = inject(UsuarioService);

  constructor(){}

   novoEndereco = new Endereco();
  
  salvar(){

    this.usuario.enderecos?.push(this.novoEndereco);
    if(this.usuario.id > 0){
      this.usuarioService.update(this.usuario).subscribe({
        next: usuario => {
          this.retorno.emit(this.usuario);
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    }else{
      this.usuarioService.save(this.usuario).subscribe({
        next: usuario => {
          this.retorno.emit(usuario);
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });
    }
  }
  deletar(){
    this.usuarioService.delete(this.usuario.id).subscribe({
      next: usuario => {
        this.retorno.emit(usuario);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
}
