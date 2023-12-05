import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnBackendService } from '../../services/conn-backend.service';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { Correo } from '../../models/correo';
import { TipoCorreo } from '../../models/tipo-correo';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() mensajeEnviadoVolver = new EventEmitter<string>();

  constructor(private connBackend: ConnBackendService) { }

  nombre: string = '';
  apellP: string = '';
  apellM: string = '';
  correo: string = '';
  contra: string = '';
  celular: string = '';

  correoArray: Array<Correo> = new Array<Correo>();
  correoTipoArray: Array<TipoCorreo> = new Array<TipoCorreo>();

  enviarMensaje(){
    this.mensajeEnviadoVolver.emit('Abrir login');
  }

  async verificarDatos(nombre_input:string, apellP_input:string,
    apellM_input:string, correo_input:string, contra_input:string,
    celular_input:string){
    
    var resultado = await this.VerificarTodo(nombre_input, apellP_input,
      apellM_input, correo_input, contra_input, celular_input);
      if(resultado){
        var resultado1 = await this.registrarUsuario(nombre_input, apellP_input,
          apellM_input, correo_input, contra_input, celular_input);
        if(resultado1){
            alert("Registro exitoso");
            this.enviarMensaje();
          }
        else{
          alert("Error de registro");
        }
      }
      else{
        var mensaje = "Revise sus datos e intente nuevamente"+
        "\n• Datos capturados:\n"+
        "    - Nombre:  "+ nombre_input + "\n" +
        "    - A. Pat.:  "+ apellP_input + "\n" +
        "    - A. Mat.:  "+ apellM_input + "\n" +
        "    - Correo:  "+ correo_input + "\n" +
        "    - Nro. cel.:  "+ celular_input;
        alert(mensaje);
      }
  }

  async VerificarTodo(nombre_input:string, apellP_input:string,
    apellM_input:string, correo_input:string, contra_input:string,
    celular_input:string) {
    
    var nombreOk: RegExp = /^[A-Za-zñÑ\s]{1,50}$/;
    var correoOk: RegExp = /^[A-Za-zñÑ0-9]{1,35}@(gmail|hotmail|outlook|yahoo)\.com$|^[A-Za-zñÑ0-9]{1,35}@(hotmail|outlook)\.(com|es)$/;
    var contraOk: RegExp = /^[A-Za-zñÑ0-9\s]{1,50}$/;
    var celularOk: RegExp = /^9[0-9]{8}$/;

    if(nombreOk.test(nombre_input) && nombreOk.test(apellP_input) && nombreOk.test(apellM_input) &&
      correoOk.test(correo_input) && contraOk.test(contra_input) && celularOk.test(celular_input)){
        if(!(await this.verificarOriginalidadCorreo(correo_input))){
          return true;
        }
        else{
          alert("Correo ya en uso...");
        }
    }
    else{
      alert("Hay errores en la sintaxis de sus datos...");
    }
    return false;
  }

  async verificarOriginalidadCorreo(correo_input:string){
    await this.getCorreo(correo_input);
    if(this.correoArray && this.correoArray.length > 0) {
      return true;
    }
    return false;
  }

  async getCorreo(cor: string) {
    try {
      const data = await this.connBackend.getCorreo(cor).toPromise();
      console.log(data);
      this.correoArray = data.correos;
    } catch (error) {
      console.error(error);
    }
  }

  async registrarUsuario(nombre_input:string, apellP_input:string,
    apellM_input:string, correo_input:string, contra_input:string,
    celular_input:string) {
      var resultado1 = await this.regCorreo(correo_input, contra_input);
      if (resultado1){
        var resultado2 = await this.regUsuario(nombre_input, apellP_input, apellM_input,
          this.correoArray[0].id_correo, celular_input);
        if(resultado2){
          return true;
        }
        else{
          alert("El usuario no pudo registrarse correctamente");
          return false;
        }
      }
      else{
        alert("El correo no pudo registrarse correctamente");
        return false;
      }
  }

  async regCorreo(correo_input:string, contra_input:string) {
    var correoOk: RegExp = /^([A-Za-zñÑ0-9]{1,35})@(gmail|hotmail|outlook|yahoo)\.(com)$|^([A-Za-zñÑ0-9]{1,35})@(hotmail|outlook)\.(com|es)$/;
    const coincidencias: RegExpMatchArray | null = correo_input.match(correoOk);
    if(coincidencias){
      var extension = '@' + (coincidencias[2] || coincidencias[5]) + '.' + (coincidencias[3] || coincidencias[6]);
      await this.getIdTipoCorreo(extension);
      try{
        await this.connBackend.postRegistrarCorreo((coincidencias[1]||coincidencias[4]), this.correoTipoArray[0].id_tipo_correo, contra_input).toPromise();
        alert('CORREO REGISTRADO');
        await this.getCorreo(correo_input);
      } catch(error) {
        console.error(error);
        return false;
      }
      return true;
    }
    else{
      return false;
    }
  }

  async getIdTipoCorreo(extension:string) {
    try {
      const data = await this.connBackend.getTipoCorreo(extension).toPromise();
      console.log(data);
      this.correoTipoArray = data.tipos;
    } catch (error) {
      console.error(error);
    }
  }

  async regUsuario(nombre_input:string, apellP_input:string,
    apellM_input:string, id_correo_input:string, celular_input:string){
      try{
        await this.connBackend.postRegistrarUsuario(nombre_input, apellP_input,
          apellM_input, id_correo_input, celular_input).toPromise();
        alert('USUARIO REGISTRADO');
      } catch(error) {
        console.error(error);
        return false;
      }
      return true;
  }
}
