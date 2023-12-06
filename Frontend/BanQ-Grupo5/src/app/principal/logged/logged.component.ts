import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Gasto } from '../../models/gasto';
import { Chart } from 'chart.js/auto';
import * as miJS from './logged.component.js';

import { ConnBackendService } from '../../services/conn-backend.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.css'
})
export class LoggedComponent implements AfterViewInit {
  
  @Input() gastos_input!: Array<Gasto>;
  @Input() id_usuario_input!: string;
  gastos_filtrados!: Array<Gasto>
  datas: Array<String> = ["0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"];
  
  datas_n: Array<{tipo:string, gastoTotal:number}> = [];
  datas_n_p: Array<{tipo:string, gastoTotal:number}> = [];
  gastosPorTipo = new Map<string, number>();
  voz_in: String = "<Texto reconocido>";
  texto_in: String = "Agregar hamburguesa por diez soles a alimentos";

  opciones: NodeListOf<Element> | undefined;

  constructor(private connBackend: ConnBackendService) { }

  ngOnInit() {

    this.opciones = document.querySelectorAll(".opcion");

    if (this.opciones) {
      Array.from(this.opciones).forEach(opcion => {
        opcion.addEventListener("click", () => {
          this.deseleccionarTodas();
          this.decolorarTodo();
          const element = opcion as HTMLElement;
          element.style.backgroundColor = "rgb(79, 70, 160)";
          const opc = document.getElementsByClassName(opcion.id);

          if (opc[0] && !opc[0].classList.contains('abiertoOPC')) {
            opc[0].classList.remove('cerradoOPC');
            opc[0].classList.add('abiertoOPC');
          }

          this.filtrarGastos(opcion.id);
          this.calcularDatas(opcion.id);
          this.setGraficos(opcion.id);
        });
      });
    }
  }

  deseleccionarTodas() {
    if (this.opciones) {
      Array.from(this.opciones).forEach(opcion => {
        const element = opcion as HTMLElement;
        element.style.backgroundColor = "rgb(110, 99, 211)";
      });
    }
  }

  decolorarTodo() {
    if (this.opciones) {
      Array.from(this.opciones).forEach(opcion => {
        const opc01 = document.getElementsByClassName(opcion.id);
        for (let i = 0; i < opc01.length; i++) {
          if (opc01[i].classList.contains('abiertoOPC')) {
            opc01[i].classList.remove('abiertoOPC');
            opc01[i].classList.add('cerradoOPC');
          }
        }
      });
    }
  }

  abrirVerEditar() {
    var iconoVE = document.getElementById('icono-01');
    var botonesVE = document.getElementById('contenidoVE-01');

    if(!iconoVE?.classList.contains('abiertoVE-01')){
        iconoVE?.classList.remove('cerradoVE-01');
        botonesVE?.classList.remove('cerradoVE-02');
        iconoVE?.classList.add('abiertoVE-01');
        botonesVE?.classList.add('abiertoVE-02');
    }
    else{
        iconoVE?.classList.remove('abiertoVE-01');
        botonesVE?.classList.remove('abiertoVE-02');
        iconoVE?.classList.add('cerradoVE-01');
        botonesVE?.classList.add('cerradoVE-02');
    }
  }

  abrirRegistrar() {
    var iconoReg = document.getElementById('icono-02');
    var botonesReg = document.getElementById('contenidoReg-01');

    if(!iconoReg?.classList.contains('abiertoReg-01')){
        iconoReg?.classList.remove('cerradoReg-01');
        botonesReg?.classList.remove('cerradoReg-02');
        iconoReg?.classList.add('abiertoReg-01');
        botonesReg?.classList.add('abiertoReg-02');
    }
    else{
        iconoReg?.classList.remove('abiertoReg-01');
        botonesReg?.classList.remove('abiertoReg-02');
        iconoReg?.classList.add('cerradoReg-01');
        botonesReg?.classList.add('cerradoReg-02');
    }
  }

  abrirReportes() {
    var iconoRep = document.getElementById('icono-03');
    var botonesRep = document.getElementById('contenidoRep-01');

    if(!iconoRep?.classList.contains('abiertoRep-01')){
        iconoRep?.classList.remove('cerradoRep-01');
        botonesRep?.classList.remove('cerradoRep-02');
        iconoRep?.classList.add('abiertoRep-01');
        botonesRep?.classList.add('abiertoRep-02');
    }
    else{
        iconoRep?.classList.remove('abiertoRep-01');
        botonesRep?.classList.remove('abiertoRep-02');
        iconoRep?.classList.add('cerradoRep-01');
        botonesRep?.classList.add('cerradoRep-02');
    }
  }

  async filtrarGastos(deseo: string) {
    switch(deseo) {
      case 'hojaAlimentacion': deseo = 'Alimentacion'; break;
      case 'hojaComunicacion': deseo = 'Comunicacion'; break;
      case 'hojaDeudas': deseo = 'Deudas'; break;
      case 'hojaEducacion': deseo = 'Educacion'; break;
      case 'hojaEntretenimiento': deseo = 'Entretenimiento'; break;
      case 'hojaIngresosVarios': deseo = 'Ingresos varios'; break;
      case 'hojaSalud': deseo = 'Salud'; break;
      case 'hojaTransporte': deseo = 'Transporte'; break;
      case 'hojaVestimenta': deseo = 'Vestimenta'; break;
      case 'hojaVivienda': deseo = 'Vivienda'; break;
      case 'hojaOtros': deseo = 'Otros'; break;
    }
    this.gastos_filtrados = this.gastos_input.filter(objeto => objeto.nombre_categoria === deseo)
  }

  async calcularDatas(deseo: string) {
    this.datas.length = 0;
    let sumatoria:number = 0.00;
    let maximo_n:number = 0.00;
    let maximo:string = '';
    let fecha_max:string = 'DD/MM/AAAA';
    let minimo_n:number = 9999999.99;
    let minimo:string = '';
    let fecha_min:string = 'DD/MM/AAAA';

    switch(deseo) {
      case 'hojaAlimentacion': deseo = 'Alimentacion'; break;
      case 'hojaComunicacion': deseo = 'Comunicacion'; break;
      case 'hojaDeudas': deseo = 'Deudas'; break;
      case 'hojaEducacion': deseo = 'Educacion'; break;
      case 'hojaEntretenimiento': deseo = 'Entretenimiento'; break;
      case 'hojaIngresosVarios': deseo = 'Ingresos varios'; break;
      case 'hojaSalud': deseo = 'Salud'; break;
      case 'hojaTransporte': deseo = 'Transporte'; break;
      case 'hojaVestimenta': deseo = 'Vestimenta'; break;
      case 'hojaVivienda': deseo = 'Vivienda'; break;
      case 'hojaOtros': deseo = 'Otros'; break;
      default: deseo = "Todo"; break;
    }
    
    if(!(deseo === "Todo")){
      for (let i=0; i<this.gastos_filtrados.length; i++) {
        sumatoria += parseFloat(this.gastos_filtrados[i].total);
        if(parseFloat(this.gastos_filtrados[i].total) > maximo_n){
          maximo_n = parseFloat(this.gastos_filtrados[i].total);
          maximo = this.gastos_filtrados[i].nombre_gasto + ' (' + this.gastos_filtrados[i].descripcion_gasto + ')';
          fecha_max = this.gastos_filtrados[i].fecha_gasto;
        }
        if(parseFloat(this.gastos_filtrados[i].total) < minimo_n){
          minimo_n = parseFloat(this.gastos_filtrados[i].total);
          minimo = this.gastos_filtrados[i].nombre_gasto + ' (' + this.gastos_filtrados[i].descripcion_gasto + ')';
          fecha_min = this.gastos_filtrados[i].fecha_gasto;
        }
      }
      this.datas.push('' + sumatoria);
      this.datas.push('' + maximo);
      this.datas.push('' + maximo_n);
      this.datas.push('' + fecha_max);
      this.datas.push('' + minimo);
      this.datas.push('' + minimo_n);
      this.datas.push('' + fecha_min);
      this.datas.push('' + (sumatoria / this.gastos_filtrados.length).toFixed(2));
  
      this.datas_n.length = 0;
      this.datas_n_p.length = 0;
      this.gastosPorTipo.clear();
  
      for(const fila of this.gastos_filtrados){
        const tipo = fila.nombre_gasto;
        const gasto = parseFloat(fila.total);
        if(this.gastosPorTipo.has(tipo)) {
          this.gastosPorTipo.set(tipo, this.gastosPorTipo.get(tipo)! + gasto);
        }
        else{
          this.gastosPorTipo.set(tipo, gasto);
        }
      }
  
      this.gastosPorTipo.forEach((gastoTotal, tipo) => {
        this.datas_n.push({ tipo, gastoTotal });
      });
  
  
  
      this.gastosPorTipo.clear();
  
      for(const fila of this.gastos_filtrados){
        const tipo = fila.nombre_gasto;
        if(this.gastosPorTipo.has(tipo)) {
          this.gastosPorTipo.set(tipo, this.gastosPorTipo.get(tipo)! + 1);
        }
        else{
          this.gastosPorTipo.set(tipo, 1);
        }
      }
  
      this.datas_n_p.length = 0;
  
      this.gastosPorTipo.forEach((gastoTotal, tipo) => {
        this.datas_n_p.push({tipo, gastoTotal});
      });
  
      for(let i=0; i<this.datas_n_p.length; i++){
        this.datas_n_p[i].gastoTotal = parseFloat((this.datas_n[i].gastoTotal / this.datas_n_p[i].gastoTotal).toFixed(2));
      }
    }
    else{
      let total:number = 0;
      for (let i=0; i<this.gastos_input.length; i++) {
        if(!(this.gastos_input[i].nombre_categoria === 'Ingresos varios')){
          sumatoria += parseFloat(this.gastos_input[i].total);
          if(parseFloat(this.gastos_input[i].total) > maximo_n){
            maximo_n = parseFloat(this.gastos_input[i].total);
            maximo = this.gastos_input[i].nombre_gasto + ' (' + this.gastos_input[i].descripcion_gasto + ')';
            fecha_max = this.gastos_input[i].fecha_gasto;
          }
          if(parseFloat(this.gastos_input[i].total) < minimo_n){
            minimo_n = parseFloat(this.gastos_input[i].total);
            minimo = this.gastos_input[i].nombre_gasto + ' (' + this.gastos_input[i].descripcion_gasto + ')';
            fecha_min = this.gastos_input[i].fecha_gasto;
          }
        }
        else{
          total += 1;
        }
      }
      this.datas.push('' + sumatoria);
      this.datas.push('' + maximo);
      this.datas.push('' + maximo_n);
      this.datas.push('' + fecha_max);
      this.datas.push('' + minimo);
      this.datas.push('' + minimo_n);
      this.datas.push('' + fecha_min);
      this.datas.push('' + (sumatoria / (this.gastos_input.length - total)).toFixed(2));
  
      this.datas_n.length = 0;
      this.datas_n_p.length = 0;
      this.gastosPorTipo.clear();
  
      for(const fila of this.gastos_input){
        if(!(fila.nombre_categoria === 'Ingresos varios')){
          const tipo = fila.nombre_categoria;
          const gasto = parseFloat(fila.total);
          if(this.gastosPorTipo.has(tipo)) {
            this.gastosPorTipo.set(tipo, this.gastosPorTipo.get(tipo)! + gasto);
          }
          else{
            this.gastosPorTipo.set(tipo, gasto);
          }
        }
      }
  
      this.gastosPorTipo.forEach((gastoTotal, tipo) => {
        this.datas_n.push({ tipo, gastoTotal });
      });
  
      this.gastosPorTipo.clear();
  
      for(const fila of this.gastos_input){
        if(!(fila.nombre_categoria === 'Ingresos varios')){
          const tipo = fila.nombre_categoria;
        if(this.gastosPorTipo.has(tipo)) {
          this.gastosPorTipo.set(tipo, this.gastosPorTipo.get(tipo)! + 1);
        }
        else{
          this.gastosPorTipo.set(tipo, 1);
        }
        }
      }
  
      this.datas_n_p.length = 0;
  
      this.gastosPorTipo.forEach((gastoTotal, tipo) => {
        this.datas_n_p.push({tipo, gastoTotal});
      });
  
      for(let i=0; i<this.datas_n_p.length; i++){
        this.datas_n_p[i].gastoTotal = parseFloat((this.datas_n[i].gastoTotal / this.datas_n_p[i].gastoTotal).toFixed(2));
      }
    }
  }

  ordenarTabla(columna: keyof Gasto | string) {
    this.gastos_input = this.gastos_input.sort((a, b) => (a[columna as keyof Gasto] > b[columna as keyof Gasto]) ? 1 : -1);
  }

  ordenarTabla1(columna: keyof Gasto | string) {
    this.gastos_filtrados = this.gastos_filtrados.sort((a, b) => (a[columna as keyof Gasto] > b[columna as keyof Gasto]) ? 1 : -1);
  }

  miGrafico!: Chart;
  ngAfterViewInit(): void {
  }

  setGraficos(deseo: string){
    switch(deseo) {
      case 'hojaAlimentacion': deseo = 'Alimentacion'; break;
      case 'hojaComunicacion': deseo = 'Comunicacion'; break;
      case 'hojaDeudas': deseo = 'Deudas'; break;
      case 'hojaEducacion': deseo = 'Educacion'; break;
      case 'hojaEntretenimiento': deseo = 'Entretenimiento'; break;
      case 'hojaIngresosVarios': deseo = 'Ingresos varios'; break;
      case 'hojaSalud': deseo = 'Salud'; break;
      case 'hojaTransporte': deseo = 'Transporte'; break;
      case 'hojaVestimenta': deseo = 'Vestimenta'; break;
      case 'hojaVivienda': deseo = 'Vivienda'; break;
      case 'hojaOtros': deseo = 'Otros'; break;
      default: deseo = "Todo"; break;
    }
    
    if(!(deseo === "Todo")){
      var tipos = this.datas_n.map(dato => dato.tipo);
      var tipos1 = this.gastos_filtrados.map(dato => dato.descripcion_gasto);
      var gastosTotales = this.datas_n.map(dato => dato.gastoTotal);
      var gastosTotales1 = this.gastos_filtrados.map(dato => parseFloat(dato.monto_gasto));

      var dataPoints = tipos1.map((tipo, index) => ({ tipo: tipo, gastoTotal: gastosTotales1[index] }));
      dataPoints.sort((a, b) => b.gastoTotal - a.gastoTotal);
      dataPoints = dataPoints.slice(0,20);
      tipos1 = dataPoints.map(dataPoint => dataPoint.tipo);
      gastosTotales1 = dataPoints.map(dataPoint => dataPoint.gastoTotal);

      var data = {
        labels: tipos,
        datasets: [{
          label: 'Total (S/.)',
          backgroundColor: ['rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)',
            'rgba(153, 102, 255, 0.2)'],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: gastosTotales
        }]
      };

      var data1 = {
        labels: tipos1,
        datasets: [{
          label: 'TOP 20: Productos por precio unitario',
          backgroundColor: ['rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)',
            'rgba(153, 102, 255, 0.2)'],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: gastosTotales1
        }]
      };

      var options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
      };

      var options1 = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
      };

      var myBarChart = new Chart(deseo, {
        type: 'pie',
        data: data,
        options: options
      });

      var myHorizontalBarChart = new Chart(deseo+'1', {
        type: 'bar',
        data: data1,
        options: options1
      });
    }
    else{
      var tipos = this.datas_n.map(dato => dato.tipo);
      var tipos1 = this.gastos_input.map(dato => dato.descripcion_gasto);
      var gastosTotales = this.datas_n.map(dato => dato.gastoTotal);
      var gastosTotales1 = this.gastos_input.map(dato => parseFloat(dato.monto_gasto));

      var dataPoints = tipos1.map((tipo, index) => ({ tipo: tipo, gastoTotal: gastosTotales1[index] }));
      dataPoints.sort((a, b) => b.gastoTotal - a.gastoTotal);
      dataPoints = dataPoints.slice(0,20);
      tipos1 = dataPoints.map(dataPoint => dataPoint.tipo);
      gastosTotales1 = dataPoints.map(dataPoint => dataPoint.gastoTotal);

      var data = {
        labels: tipos,
        datasets: [{
          label: 'Total (S/.)',
          backgroundColor: ['rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)',
            'rgba(153, 102, 255, 0.2)'],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: gastosTotales
        }]
      };

      var data1 = {
        labels: tipos1,
        datasets: [{
          label: 'TOP 20: Ganancia/Gastos por precio unitario',
          backgroundColor: ['rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)',
            'rgba(153, 102, 255, 0.2)'],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: gastosTotales1
        }]
      };

      var options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
      };

      var options1 = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
      };

      var myBarChart = new Chart(deseo, {
        type: 'pie',
        data: data,
        options: options
      });

      var myHorizontalBarChart = new Chart(deseo+'1', {
        type: 'bar',
        data: data1,
        options: options1
      });
    }
  }

  async enviarTexto(texto: String){
    if(await this.regGasto(texto, this.id_usuario_input)){
      await this.getGastos();
    }
  }

  async regGasto(texto: String, id:String){
      try{
        await this.connBackend.postRegistrarGasto(texto, id).toPromise();
        alert('GASTO REGISTRADO');
      } catch(error) {
        console.error(error);
        return false;
      }
      return true;
  }

  async getGastos(){
    try{
      const data = await this.connBackend.getGastos(this.id_usuario_input).toPromise();
      console.log(data);
      this.gastos_input = data.gastos;
    } catch(error) {
      console.error(error);
    }
    this.ordenarTabla('fecha_gasto');
  }

  gastofil(deseo: string){
    let gastos_fil!: Array<Gasto>
    switch(deseo) {
      case '0': deseo = 'Alimentacion'; break;
      case '1': deseo = 'Comunicacion'; break;
      case '2': deseo = 'Deudas'; break;
      case '3': deseo = 'Educacion'; break;
      case '4': deseo = 'Entretenimiento'; break;
      case '5': deseo = 'Ingresos varios'; break;
      case '6': deseo = 'Salud'; break;
      case '7': deseo = 'Transporte'; break;
      case '8': deseo = 'Vestimenta'; break;
      case '9': deseo = 'Vivienda'; break;
      case '10': deseo = 'Otros'; break;
      default: deseo = "Todo"; break;
    }


    return gastos_fil
  }
}
