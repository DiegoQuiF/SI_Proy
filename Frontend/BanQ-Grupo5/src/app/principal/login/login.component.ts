import { Component, Output , EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnBackendService } from '../../services/conn-backend.service';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() mensajeEnviado = new EventEmitter<string>();
  @Output() usuarioLogin = new EventEmitter<string>();

  constructor(private connBackend: ConnBackendService) { }
  
  correo: string = 'diegoQF@gmail.com';
  contra: string = 'diego123';

  usuarioArray: Array<Usuario> = new Array<Usuario>();

  enviarMensaje(){
    this.mensajeEnviado.emit('Abrir register')
  }

  async verificarDatos(correo_input:string, contra_input:string){
    await this.getUsuarios(correo_input, contra_input);
    if (this.usuarioArray && this.usuarioArray.length > 0) {
      alert('Sesión iniciada como: ' + this.usuarioArray[0].completo_usuario);
      this.usuarioLogin.emit(this.usuarioArray[0].id_usuario);
      this.mensajeEnviado.emit('Abrir logged');
    } else {
      alert('Verifique sus credenciales');
    }
  }

  async getUsuarios(cor: string, inp: string) {
    try {
      const data = await this.connBackend.getUsuario(cor, inp).toPromise();
      console.log(data);
      this.usuarioArray = data.usuarios;
    } catch (error) {
      console.error(error);
    }
  }
}
