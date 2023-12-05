import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnBackendService } from '../services/conn-backend.service';
import { Gasto } from '../models/gasto';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  id_user: string = '';
  mensajeRecibido: string = '';

  gastosArray: Array<Gasto> = new Array<Gasto>();

  constructor(private connBackend: ConnBackendService) { }

  recibirMensaje(mensaje: string) {
    this.mensajeRecibido = mensaje;
    if(this.mensajeRecibido=='Abrir register'){
      var hojaLogin = document.getElementById('hojaLogin');
      var hojaRegister = document.getElementById('hojaRegister');
      hojaLogin?.classList.remove('abierto');
      hojaLogin?.classList.add('cerrado');
      hojaRegister?.classList.remove('cerrado');
      hojaRegister?.classList.add('abierto');
    }
    else if(this.mensajeRecibido=='Abrir logged'){
      var hojaLogin = document.getElementById('hojaLogin');
      var hojaLogged = document.getElementById('hojaLogged');
      hojaLogin?.classList.remove('abierto');
      hojaLogin?.classList.add('cerrado');
      hojaLogged?.classList.remove('cerrado');
      hojaLogged?.classList.add('abierto');
    }
    else if(this.mensajeRecibido=='Abrir login'){
      var hojaLogin = document.getElementById('hojaLogin');
      var hojaRegister = document.getElementById('hojaRegister');
      hojaRegister?.classList.remove('abierto');
      hojaRegister?.classList.add('cerrado');
      hojaLogin?.classList.remove('cerrado');
      hojaLogin?.classList.add('abierto');
    }
    else{
      alert("ERROR DEL SISTEMA");
    }
  }

  async recibirLog(mensaje: string) {
    this.id_user = mensaje;
    await this.getGastos();
  }

  async getGastos(){
    try{
      const data = await this.connBackend.getGastos(this.id_user).toPromise();
      console.log(data);
      this.gastosArray = data.gastos;
    } catch(error) {
      console.error(error);
    }
    this.ordenarTabla('fecha_gasto');
  }

  ordenarTabla(columna: keyof Gasto | string) {
    this.gastosArray = this.gastosArray.sort((a, b) => (a[columna as keyof Gasto] > b[columna as keyof Gasto]) ? 1 : -1);
  }
}
