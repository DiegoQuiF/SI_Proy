import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ConnBackendService {

  private BASE_URL = 'http://127.0.0.1:5000';
  constructor(private http:HttpClient) { }

  getUsuario(correo:string, contra:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/${correo}/${contra}`);
  }

  getCorreo(correo:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/${correo}`);
  }

  getTipoCorreo(correo:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/tipo/${correo}`);
  }

  getGastos(id:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/gastos/${id}`);
  }

  postRegistrarCorreo(nombre:string, id:string, contra:string):Observable<any>{
    const data = {
      nombre_correo: nombre,
      id_correo: id,
      contra_correo: contra
    }
    return this.http.post(`${this.BASE_URL}/registrarCorreo`, data);
  }

  postRegistrarUsuario(nombre:string, aPat:string, aMat:string, id:string, celular:string):Observable<any>{
    const data = {
      nombre_usuario: nombre,
      paterno_usuario: aPat,
      materno_usuario: aMat,
      id_correo_usuario: id,
      celular_usuario: celular
    }
    return this.http.post(`${this.BASE_URL}/registrarUsuario`, data);
  }

  postRegistrarGasto(mensaje:String, id:String):Observable<any>{
    const data = {
      mensaje: mensaje,
      id_usuario: id
    }
    return this.http.post(`${this.BASE_URL}/registrarGasto`, data);
  }
}
